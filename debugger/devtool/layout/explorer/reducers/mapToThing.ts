export function mapToThing(thing: any): any {
  return (prev: Record<string, any>, next: string) => {
    prev[next] = thing
    return prev
  }
}
