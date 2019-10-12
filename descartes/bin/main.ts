
const path = require('path')
const fs = require('fs')

const env = process.env.DECENTRALAND_ENV || 'org'
const target: string = process.env.DESCARTES_TARGET || process.env.PWD
const mode: DescartesMode = process.env.DESCARTES_MODE || 'mappings'

export type DescartesMode = 'mappings' | 'content'

const targetUrl = env.length <= 4 ? `https://content.decentraland.${env}` : env
export type StringCoordinate = string
export type SceneId = string
