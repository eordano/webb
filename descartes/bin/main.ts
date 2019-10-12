import { configureStore } from '@dcl/kernel/core/store'

const path = require('path')
const fs = require('fs')

const env = process.env.DECENTRALAND_ENV || 'org'
const target: string = process.env.DESCARTES_TARGET || process.env.PWD
const mode: DescartesMode = process.env.DESCARTES_MODE || 'mappings'

export type DescartesMode = 'mappings' | 'content'

const targetUrl = env.length <= 4 ? `https://content.decentraland.${env}` : env
export type StringCoordinate = string
export type SceneId = string

export type ConfiguredDescartes = {
    getPositionToSceneInfo(squareDefinition: FourCoordinates): Record<StringCoordinate, SceneId>
}

export function configureDescartes(fetchFun: FetchJsonFunction): ConfiguredDescartes {
    return {
        getPositionToSceneInfo: (squareDefinition: FourCoordinates) => getPositionToSceneInfo(fetchFun)
    }
}


async function storePositions(positions: any) {
    for (let mapping of positions) {
        for (position of mapping.positions) {
            storePosition(position, mapping.sceneId)
        }
    }
}

function storeManifests(positions: any) {
    const positions = await getAllPositionToSceneInfo()
    for (let scene of positions.scenes) {
        storeManifest(scene, )
    }
}

function storeContent() {
}
