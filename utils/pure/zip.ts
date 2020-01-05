export function zip<R extends number | string | symbol, T>(thing: [R, T][]) {
  return thing.reduce((cumm: Record<R, T>, value: [R, T]) => {
    cumm[value[0]] = value[1]
    return cumm
  }, {} as any)
}

export function zipTwo<R extends number | string | symbol, T>(thing: R[], two: T[]) {
  return thing.reduce((cumm: Record<R, T>, value: R, index: number) => {
    cumm[value] = two[index]
    return cumm
  }, {} as any)
}