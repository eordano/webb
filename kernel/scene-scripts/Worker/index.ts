
export function createWorker(name: string, url: string) {
  if (typeof module !== 'undefined' && module.exports) {
    return new (require('webworker-threads').Worker)(url)
  } else {
    return new Worker(url, { name })
  }
}