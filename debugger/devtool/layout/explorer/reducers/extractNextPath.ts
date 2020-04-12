export function extractNextPath(_path: string): [string, string | null] {
  const path = _path.startsWith('.') ? _path.slice(1) : _path
  const index = path.indexOf('.')
  if (index === -1) {
    return [path, null]
  }
  return [path.substr(0, index), path.substr(index + 1)]
}
