import fs from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
const DAYS = 1
const HOURS = 1
const MINUTES = 1
const SECONDS = 1

type Secrets = {
    datadog: {
        apiKey: string
        appKey: string
    }
}

const secrets: Secrets = JSON.parse(fs.readFileSync(join(__dirname, '../../.secret')).toString())

const ONE_WEEK = 7 * DAYS * 24 * HOURS * 60 * MINUTES * 60 * SECONDS
const millisToSeconds = (d: Date) => d.getTime() / 1000
const formatDateToString = (d: number) => d.toFixed(0)

export type Seconds = number
export type SecondsSinceUNIXEpoch = number
export type MillisSinceUNIXEpoch = number
export type PointList = [ SecondsSinceUNIXEpoch, number ][]

export type DataResponse = {
  status: 'ok' | string
  res_type: 'time_series' | string
  series: [
    {
      "metric": string
      "attributes": any
      "display_name": string
      "unit": null,
      "pointlist": PointList
      "end": MillisSinceUNIXEpoch,
      "interval": Seconds,
      "start": MillisSinceUNIXEpoch,
      "length": number,
      "aggr": any,
      "scope": string
      "expression": string
    }
  ],
  "from_date": MillisSinceUNIXEpoch,
  "group_by": string[],
  "to_date": MillisSinceUNIXEpoch,
  "query": string
  "message": string
}

export async function getConnectedUsers(env: 'prod' | 'stg' | 'dev' = 'prod'): Promise<DataResponse> {
    const now = new Date()
    const from = formatDateToString(millisToSeconds(now) - ONE_WEEK)
    const to = formatDateToString(millisToSeconds(now))
    const query = encodeURIComponent(`max:commserver_${env}.connection.remoteCandidateTypeCount{*}`)
    const response = await fetch(`https://api.datadoghq.com/api/v1/query?from=${from}&to=${to}&query=${query}`, {
        headers: {
            'DD-API-KEY': secrets.datadog.apiKey,
            'DD-APPLICATION-KEY': secrets.datadog.appKey,
        }
    })
    const body = await response.json()
    return body as DataResponse
}