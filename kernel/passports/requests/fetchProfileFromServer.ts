export async function fetchProfileFromServer(serverUrl: string, userId: string, accessToken: string) {
  try {
    const request = await fetch(`${serverUrl}/profile/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    if (!request.ok) {
      throw new Error('Profile not found')
    }
    return await request.json()
  } catch (up) {
    throw up
  }
}
