import React, { DependencyList } from 'react'

export function usePromise(promiseBuilder: () => Promise<any>, deps?: DependencyList) {
    const [result, setResult] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const executePromise = async () => {
            setIsLoading(true)
            try {
                setResult(await promiseBuilder())
                setIsLoading(false)
            } catch (error) {
                setError(error)
            }
        }
        executePromise()
    }, deps)
    return { result, error, isLoading }
}
