import React from 'react'

export function useFetch(url: string, options?: Request, fetchFun: typeof fetch = fetch) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() => {
    const fetchData = async () => {
      const cached = localStorage.getItem(url)
      if (cached) {
        setData(JSON.parse(cached))
        return
      }
      setIsLoading(true)
      try {
        const res = await fetchFun(url, options)
        const json = await res.json()
        localStorage.setItem(url, JSON.stringify(json))
        setData(json)
        setIsLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])
  return { data, error, isLoading }
}
