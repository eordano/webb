import { slugify } from './slugify'

export const redirectCache: Record<string, any> = {}

export const routeFor = (section: string, subsection?: string, extra: string = '') => {
  return `/${slugify(section)}${subsection ? `/${slugify(subsection)}` : ''}${extra}`
}

export const redirectTo = (section: string, subsection?: string) => {
  const path = routeFor(section as any, subsection)
  if (!redirectCache[path]) {
    redirectCache[path] = (ev: any) => {
      ev.preventDefault()
      history.pushState({}, '[Horus] ' + section, path)
      return false
    }
  }
  return redirectCache[path]
}
