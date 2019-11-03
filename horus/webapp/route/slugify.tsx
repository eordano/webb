export const slugify = (name: string) => name.replace(/[^a-zA-Z0-9/]/gi, '-').toLowerCase()
