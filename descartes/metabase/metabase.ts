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
  const result = await Promise.all([queryMetric('348'), queryMetric('349'), queryMetric('350')])
  return result
}

export async function queryMetric(metricId: string) {
  return metabaseRequest('card', metricId)
}

export async function queryDashboard(dashboardId: string) {
  return metabaseRequest('dashboard', dashboardId)
}

export async function metabaseRequest(...params) {
  if (!cred.session) {
    await login()
  }
  const headers = {
    'Content-Type': 'application/json',
    'X-Metabase-Session': cred.session!
  }
  const request = await fetch(`${cred.url}/api/${params.join('/')}`, { headers })
  console.log(request)
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
