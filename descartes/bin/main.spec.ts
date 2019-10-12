describe('descartes', () => {
    const dataForUrl = {}
    const fakeFetch = function(url) {
        return new Promise((resolve) => 
            resolve({
                json: () => new Promise((res, rej) => res(dataForUrl[url]))
            })
        )
    }
    it('fetches all the mappings', () => {
        const fetchFun = fakeFetch
        const env = 'org'
        const descartes = configureDescartes(fetchFun)(env)
        descartes.
    })
})
