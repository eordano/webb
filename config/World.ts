export const NETWORK_HZ = 10

export const loginConfig = {
  org: {
    domain: 'decentraland.auth0.com',
    client_id: 'yqFiSmQsxk3LK46JOIB4NJ3wK4HzZVxG'
  },
  today: {
    domain: 'dcl-stg.auth0.com',
    client_id: '0UB0I7w6QA3AgSvbXh9rGvDuhKrJV1C0'
  },
  zone: {
    domain: 'dcl-test.auth0.com',
    client_id: 'lTUEMnFpYb0aiUKeIRPbh7pBxKM6sccx'
  },
  audience: 'decentraland.org'
}
export const AUTH = {
  AUTH0_CLIENT_ID: loginConfig.org.client_id,
  AUTH0_DOMAIN: loginConfig.org.domain,
  AUTH0_REDIRECT: 'http://localhost:3000/login_callback',
  AUTH0_AUDIENCE: 'decentraland.org',
  EPHEMERAL_KEY_TTL: 24 * 60 * 60 * 1000
}


const configuration = {
  ...AUTH
}

export function getConfiguration(key: keyof typeof AUTH, defaultValue?: any) {
  return configuration[key] || defaultValue
}
