import { Communications } from 'dcl/config'
import { ConnectMessage, CoordinatorMessage, MessageType, WebRtcMessage, WelcomeMessage } from 'dcl/protos/broker_pb'
import { createLogger, ILogger, Observable } from 'dcl/utils'
import { future, IFuture } from 'fp-future'
import { Message } from 'google-protobuf'
import {
  commsDatachannelReliable,
  commsDatachannelReliableLost,
  commsDatachannelUnreliable,
  commsDatachannelUnreliableLost,
  commsWebrtcError,
  commsWebrtcIceAnswer,
  commsWebrtcIceCandidate,
  commsWebrtcIceOffer,
  commsWebrtcIceState,
  commsWebrtcSignalingState,
  commsWelcome,
  protocolUnknown
} from '../actions'
import { SocketReadyState } from '../types/SocketReadyState'
import { BrokerMessage, IBrokerConnection } from './IBrokerConnection'

export class WebRTCBrokerConnection implements IBrokerConnection {
  public alias: number | null = null
  public authenticated = false

  public commServerAlias: number | null = null
  public webRtcConn: RTCPeerConnection | null = null

  public reliableDataChannel: RTCDataChannel | null = null
  public unreliableDataChannel: RTCDataChannel | null = null

  public logger: ILogger = createLogger('Broker: ')

  public onMessageObservable = new Observable<BrokerMessage>()
  public onUpdateObservable = new Observable<any>()

  public gotCandidatesFuture: IFuture<RTCSessionDescription> = future<RTCSessionDescription>()
  private unreliableFuture = future<void>()
  private reliableFuture = future<void>()

  get isConnected(): Promise<void> {
    return Promise.all([this.unreliableFuture, this.reliableFuture]) as Promise<any>
  }

  get isAuthenticated() {
    return this.authenticated
  }

  get hasUnreliableChannel() {
    return (this.unreliableDataChannel && this.unreliableDataChannel.readyState === 'open') || false
  }

  get hasReliableChannel() {
    return (this.reliableDataChannel && this.reliableDataChannel.readyState === 'open') || false
  }

  private ws: WebSocket | null = null

  constructor(public url: string, public getAuthenticationMessageBytes: (message: string) => Promise<Uint8Array>) {
    this.onMessageObservable.add(_ => this.onUpdateObservable.notifyObservers(_))
    this.connectRTC()
    this.connectWS()

    setTimeout(() => {
      if (!this.hasReliableChannel) {
        this.reliableFuture.reject(new Error('Communications link cannot be established (Timeout)'))
      }
    }, 10000)
  }

  printDebugInformation(): void {
    if (this.ws && this.ws.readyState === SocketReadyState.OPEN) {
      const state = (this.authenticated ? 'authenticated' : 'not authenticated') + ` my alias is ${this.alias}`
      this.logger.log(state)
    } else {
      this.logger.log(`non active coordinator connection to ${this.url}`)
    }
  }

  sendReliable(data: Uint8Array) {
    if (!this.hasReliableChannel) {
      throw new Error('trying to message using null reliable channel')
    }
    this.reliableDataChannel!.send(data)
  }

  sendUnreliable(data: Uint8Array) {
    if (!this.hasUnreliableChannel) {
      throw new Error('trying to message using null unreliable channel')
    }
    this.unreliableDataChannel!.send(data)
  }

  close() {
    if (this.webRtcConn) {
      this.webRtcConn.onsignalingstatechange = null
      this.webRtcConn.oniceconnectionstatechange = null
      this.webRtcConn.onicecandidate = null
      this.webRtcConn.ondatachannel = null
      this.webRtcConn.close()
      this.webRtcConn = null
    }

    if (this.ws) {
      this.ws.onmessage = null
      this.ws.onerror = null
      this.ws.onclose = null
      this.ws.close()
    }
  }

  async onWsMessage(event: MessageEvent) {
    const data = event.data
    const msg = new Uint8Array(data)

    const msgType = CoordinatorMessage.deserializeBinary(data).getType()

    switch (msgType) {
      case MessageType.UNKNOWN_MESSAGE_TYPE: {
        this.onUpdateObservable.notifyObservers(protocolUnknown(msgType as any))
        this.logger.log('unsopported message')
        break
      }
      case MessageType.WELCOME: {
        let message: WelcomeMessage
        try {
          message = WelcomeMessage.deserializeBinary(msg)
        } catch (e) {
          this.logger.error('cannot deserialize welcome client message', e, msg)
          break
        }

        const alias = message.getAlias()
        const availableServers = message.getAvailableServersList()

        if (availableServers.length === 0) {
          throw new Error('no available servers')
        }

        const serverAlias = availableServers[0]
        this.commServerAlias = serverAlias
        this.alias = alias
        this.logger.info('my alias is', alias)
        this.onUpdateObservable.notifyObservers(commsWelcome({ alias, serverAlias, availableServers }))
        this.onUpdateObservable.notifyObservers(protocolUnknown(msgType as any))

        const connectMessage = new ConnectMessage()
        connectMessage.setType(MessageType.CONNECT)
        connectMessage.setToAlias(serverAlias)
        this.sendCoordinatorMessage((connectMessage as any) as Message)
        break
      }
      case MessageType.WEBRTC_ICE_CANDIDATE:
      case MessageType.WEBRTC_OFFER:
      case MessageType.WEBRTC_ANSWER: {
        let message: WebRtcMessage
        try {
          message = WebRtcMessage.deserializeBinary(msg)
        } catch (e) {
          this.logger.error('cannot deserialize webrtc ice candidate message', e, msg)
          break
        }

        if (message.getFromAlias() !== this.commServerAlias) {
          this.logger.log('ignore webrtc message from unknown peer', message.getFromAlias())
          break
        }

        const decoder = new TextDecoder('utf8')
        const sessionData = decoder.decode(message.getData() as ArrayBuffer)

        if (msgType === MessageType.WEBRTC_ICE_CANDIDATE) {
          try {
            const candidate = JSON.parse(sessionData)
            this.onUpdateObservable.notifyObservers(commsWebrtcIceCandidate(candidate))
            await this.webRtcConn!.addIceCandidate(candidate)
          } catch (err) {
            this.logger.error(err)
          }
        } else if (msgType === MessageType.WEBRTC_OFFER) {
          try {
            await this.webRtcConn!.setRemoteDescription(JSON.parse(sessionData))
            const desc = await this.webRtcConn!.createAnswer({})
            await this.webRtcConn!.setLocalDescription(desc)

            let localDescription = this.webRtcConn!.localDescription
            this.onUpdateObservable.notifyObservers(
              commsWebrtcIceOffer({ serverAlias: this.commServerAlias, sessionData, localDescription })
            )
            let answer = this.webRtcConn!.localDescription

            if (answer && answer.sdp) {
              const msg = new WebRtcMessage()
              msg.setToAlias(this.commServerAlias)
              msg.setType(MessageType.WEBRTC_ANSWER)
              const encoder = new TextEncoder()
              const data = encoder.encode(JSON.stringify(answer))
              msg.setData(data)
              this.sendCoordinatorMessage((msg as any) as Message)
              this.onUpdateObservable.notifyObservers(commsWebrtcIceAnswer({ ...answer, weAuthored: true }))
            }
          } catch (err) {
            this.logger.error(err)
          }
        } else if (msgType === MessageType.WEBRTC_ANSWER) {
          try {
            this.onUpdateObservable.notifyObservers(commsWebrtcIceAnswer({ sessionData, weAuthored: false }))
            await this.webRtcConn!.setRemoteDescription(JSON.parse(sessionData))
          } catch (err) {
            this.logger.error(err)
          }
        }
        break
      }
      default: {
        this.logger.log('ignoring message with type', msgType)
        break
      }
    }
  }

  private sendCoordinatorMessage = (msg: Message) => {
    if (!this.ws || this.ws.readyState !== SocketReadyState.OPEN) {
      throw new Error('try to send answer to a non ready ws')
    }

    const bytes = msg.serializeBinary()

    this.ws.send(bytes)
  }

  private connectRTC() {
    this.webRtcConn = new RTCPeerConnection({
      iceServers: Communications.iceServers
    })

    this.webRtcConn.onsignalingstatechange = (e: Event) => {
      this.onUpdateObservable.notifyObservers(
        commsWebrtcSignalingState({
          event: e,
          iceState: this.webRtcConn!.iceConnectionState,
          signalingState: this.webRtcConn!.signalingState
        })
      )
      this.logger.log(`signaling state: ${this.webRtcConn!.signalingState}`)
    }

    this.webRtcConn.oniceconnectionstatechange = (e: Event) => {
      this.onUpdateObservable.notifyObservers(
        commsWebrtcIceState({
          event: e,
          iceState: this.webRtcConn!.iceConnectionState,
          signalingState: this.webRtcConn!.signalingState
        })
      )
      this.logger.log(`ice connection state: ${this.webRtcConn!.iceConnectionState}`)
    }

    this.webRtcConn.onicecandidate = this.onIceCandidate
    this.webRtcConn.ondatachannel = this.onDataChannel
  }

  private connectWS() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    try {
      this.ws = new WebSocket(this.url)
      this.ws.binaryType = 'arraybuffer'

      this.ws.onerror = event => {
        this.onUpdateObservable.notifyObservers(
          commsWebrtcError({ event, message: 'Could not establish communications' })
        )
        this.logger.error('socket error', event)
        this.ws = null
      }

      this.ws.onmessage = event => {
        this.onWsMessage(event).catch(err => {
          this.onUpdateObservable.notifyObservers(
            commsWebrtcError({ context: event, err, message: 'Fatal: connection lost' })
          )
          this.logger.error(err)
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  private onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate !== null) {
      const msg = new WebRtcMessage()
      msg.setType(MessageType.WEBRTC_ICE_CANDIDATE)
      // TODO: Ensure commServerAlias, it may be null
      msg.setToAlias(this.commServerAlias!)

      const encoder = new TextEncoder()
      const data = encoder.encode(JSON.stringify(event.candidate.toJSON()))
      msg.setData(data)

      this.sendCoordinatorMessage(msg)
    } else {
      this.gotCandidatesFuture.resolve(this.webRtcConn!.localDescription!)
    }
  }

  private onDataChannel = (e: RTCDataChannelEvent) => {
    let dc = e.channel

    dc.onclose = () => {
      this.onUpdateObservable.notifyObservers(
        dc.label === 'reliable' ? commsDatachannelReliableLost(e) : commsDatachannelUnreliableLost(e)
      )
      this.logger.log(`DataChannel ${JSON.stringify(dc.label)} has closed`)
    }

    dc.onopen = async (e: any) => {
      const label = dc.label
      this.logger.log(`DataChannel ${JSON.stringify(dc.label)} has opened`)
      this.onUpdateObservable.notifyObservers(
        label === 'reliable' ? commsDatachannelReliable(e) : commsDatachannelUnreliable(e)
      )

      if (label === 'reliable') {
        this.reliableDataChannel = dc
        const bytes = await this.getAuthenticationMessageBytes('')
        if (dc.readyState === 'open') {
          dc.send(bytes)
          this.authenticated = true
          this.reliableFuture.resolve()
        } else {
          this.logger.error('cannot send authentication, data channel is not ready')
        }
      } else if (label === 'unreliable') {
        this.unreliableFuture.resolve()
        this.unreliableDataChannel = dc
      }
    }

    dc.onmessage = (e: MessageEvent) => {
      const data = e.data
      const msg = new Uint8Array(data)

      this.onMessageObservable.notifyObservers({ data: msg, channel: dc.label })
    }
  }
}
