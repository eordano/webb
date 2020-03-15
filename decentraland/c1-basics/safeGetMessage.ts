import { Address } from './Address'
import { ChainedCertificatedMessage, validateChainedCertificate } from './ChainedCertificatedMessage'

export function safeGetMessage(sender: Address, messages: ChainedCertificatedMessage): string {
  if (validateChainedCertificate(sender, messages)) {
    return messages[messages.length - 1].payload
  }
}
