import fs from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'

type Secrets = {
  metabase: {
    email: string
    password: string
    url: string
    session?: string
  }
}

const secrets: Secrets = JSON.parse(fs.readFileSync(join(__dirname, '../../.secret')).toString())
const cred = secrets.metabase

export async function deploys() {
  const result = await Promise.all([
    queryMetric('348'),
    queryMetric('349'),
    queryMetric('350'),
    queryRows('351')
  ])
  return result
}

export async function queryMetric(metricId: string) {
  const result = await metabaseRequest('card', metricId)
  return result.result_metadata[0].fingerprint.type['type/Number'].avg
}

export async function queryRows(metricId: string) {
  const result = await metabasePostRequest('card', metricId, 'query')
  const keys = result.data.cols.map((val: any) => val.name)
  return result.data.rows.map((value: string[]) =>
    value.reduce(
      (cumm, val, index) => ({
        ...cumm,
        [keys[index]]: val
      }),
      {}
    )
  )
}

export async function queryDashboard(dashboardId: string) {
  return metabaseRequest('dashboard', dashboardId)
}

export async function metabasePostRequest(...params) {
  return baseMetabaseRequest({ method: 'POST' }, ...params)
}

export async function metabaseRequest(...params) {
  return baseMetabaseRequest({}, ...params)
}

export async function baseMetabaseRequest(opts: any, ...params) {
  if (!cred.session) {
    await login()
  }
  const headers = {
    'Content-Type': 'application/json',
    'X-Metabase-Session': cred.session!
  }
  const request = await fetch(`${cred.url}/api/${params.join('/')}`, { headers, ...opts })
  if (request.status === 200) {
    return request.json()
  }
}

export async function login() {
  const request = await fetch(`${cred.url}/api/session`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ username: cred.email, password: cred.password })
  })
  if (request.status === 200) {
    const response = await request.json()
    console.log(request, response)
    return (cred.session = response.id)
  } else {
    throw new Error(JSON.stringify({ request }))
  }
}
