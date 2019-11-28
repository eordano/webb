export type State = {
  state: 'Not started' | 'Running' | 'Done'
  pending: number
  resolved: number
  done: number
  totalGltfs: number
  totalTextures: number
  totalBins: number
  currentX: number
  doneScanning: boolean
  existingGltfs: number
  existingTextures: number
  scannedGltfs: number
  scannedTextures: number
  currentY: number
  errored: number
  empty: number
  log: ErrorLog[]
  missing: MissingLog[]
}
type MissingLog = {
  coords: string,
  scene: string,
  name: string,
  hash: string
}
type ErrorLog = {
  coords: string
  scene: string
  gltfs: number
  bins: number
  textures: number
}
export type FormOptions = {
  contentServer: string
  assetBundleServer: string
  x: number
  y: number
  width: number
  height: number
}
