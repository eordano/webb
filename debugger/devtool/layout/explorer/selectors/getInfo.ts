export const EmptyTree = { expanded: false, hasKeys: false }

export function getInfo(object: any, path: string) {
  const parts = path.split('.').filter((_) => _ !== '')
  const end = parts.reduce((prev, next) => prev[next], object)
  return {
    hasKeys: true,
    keys: typeof end === 'object' ? Object.keys(end) : [],
    values:
      typeof end === 'object'
        ? Object.keys(end).reduce((prev, next) => {
            prev[next] = typeof end[next] === 'object' ? EmptyTree : end[next]
            return prev
          }, {} as Record<string, any>)
        : end,
  }
}
