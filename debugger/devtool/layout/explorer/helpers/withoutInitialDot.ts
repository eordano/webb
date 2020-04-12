export function withoutInitialDot(str: string): string {
  if (str.startsWith('.')) {
    return withoutInitialDot(str.slice(1))
  }
  return str
}
