export async function fetchCatalog(url: string) {
  const request = await fetch(url)
  if (!request.ok) {
    throw new Error('Catalog not found')
  }
  return request.json()
}
