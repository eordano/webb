export const env = process.env.DECENTRALAND_ENV || 'org'
export const target: string = process.env.DESCARTES_TARGET || process.env.PWD + '/data'
export const mode: DescartesMode = (process.env.DESCARTES_MODE || 'mappings') as DescartesMode

export const oldTarget: string = process.env.DESCARTES_1 || process.env.PWD + '/old_data'
export const newTarget: string = process.env.DESCARTES_2 || process.env.PWD + '/data'

export type DescartesMode = 'mappings' | 'content'

export const targetUrl = env.length <= 4 ? `https://content.decentraland.${env}` : env
export type StringCoordinate = string
export type SceneId = string
