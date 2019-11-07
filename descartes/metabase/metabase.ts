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
  const result = await Promise.all([queryMetric('348'), queryMetric('349'), queryMetric('350'), queryRows('351')])
  return result
}

export async function queryMetric(metricId: string) {
  const result = await metabaseRequest('card', metricId)
  return result.result_metadata[0].fingerprint.type['type/Number'].avg
}

export async function queryRows(metricId: string) {
  const result = await metabasePostRequest('card', metricId, 'query')
  return rowsAndColsToMap(result)
}

export function rowsAndColsToMap(result: any) {
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

export async function userPerf(userId: string) {
  const results = await baseMetabaseRequest(
    {
      method: 'POST',
      body: JSON.stringify({
        database: 2,
        type: 'query',
        query: {
          'source-table': 758,
          fields: [
            ['field-id', 15092],
            ['field-id', 15073],
            ['field-id', 15089],
            ['field-id', 15075],
            ['field-id', 15066],
            ['field-id', 15080],
            ['field-id', 15070],
            ['field-id', 15068],
            ['field-id', 15074],
            ['field-id', 15087],
            ['field-id', 15078]
          ],
          filter: ['=', ['field-id', 15069], userId],
          'order-by': [['desc', ['field-id', 15078]]]
        },
        parameters: []
      })
    },
    'dataset'
  )
  return rowsAndColsToMap(results)
}

export async function userMovements(userId: string) {
  const results = await baseMetabaseRequest(
    {
      method: 'POST',
      body: JSON.stringify({
        database: 2,
        type: 'query',
        query: {
          'source-table': 538,
          'order-by': [['desc', ['field-id', 10286]]],
          filter: ['=', ['field-id', 10270], userId],
          fields: [
            ['field-id', 10265],
            ['field-id', 10281],
            ['field-id', 10273],
            ['field-id', 10279],
            ['field-id', 10276]
          ]
        },
        parameters: []
      })
    },
    'dataset'
  )
  return rowsAndColsToMap(results)
}

export async function findUser(user: string) {
  const results = await baseMetabaseRequest(
    {
      method: 'POST',
      body: JSON.stringify({
        database: 2,
        native: {
          query: `SELECT "avatars"."users"."id" AS "id", "avatars"."users"."received_at" AS "received_at", "avatars"."users"."eth_address" AS "eth_address", "avatars"."users"."email" AS "email"
  FROM "avatars"."users"
  WHERE "avatars"."users"."email" LIKE '%${user}%' OR
    "avatars"."users"."id" LIKE '%${user}' OR
    "avatars"."users"."eth_address" LIKE '${user}'
  ORDER BY "avatars"."users"."received_at" DESC
  LIMIT 10;`,
          'template-args': {}
        },
        parameters: [],
        type: 'native'
      })
    },
    'dataset'
  )
  return rowsAndColsToMap(results)
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
