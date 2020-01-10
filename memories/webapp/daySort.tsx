export function daySort(a: string, b: string) {
  if (a.startsWith('Día') && b.startsWith('Día')) {
    return parseInt(a.split(' ')[1], 10) - parseInt(b.split(' ')[1], 10)
  }
  return a.localeCompare(b)
}
