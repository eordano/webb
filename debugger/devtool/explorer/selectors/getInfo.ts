export const EmptyTree = { expanded: false, hasKeys: false }

export function getInfo(object: any, path: string) {
  const parts = path.split('.').filter((_) => _ !== '')
  const end = parts.reduce((prev, next) => prev[next], object)
  console.log(`GetInfo on ${JSON.stringify(object, null, 2)}: ${parts.join(':')} has end = ${JSON.stringify(end)}`)
  return {
    hasKeys: true,
    keys: typeof end === 'object' ? Object.keys(end) : [],
    values:
      typeof end === 'object'
        ? Object.keys(end).reduce((prev, next) => {
            prev[next] =
              typeof end[next] === 'object'
                ? EmptyTree
                : {
                    loading: false,
                    expanded: true,
                    hasKeys: true,
                    values: end[next],
                  }
            return prev
          }, {} as Record<string, any>)
        : end,
  }
}
