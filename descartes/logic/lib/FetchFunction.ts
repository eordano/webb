export type FetchFunction = (url: string) => Promise<{
  arrayBuffer: () => Promise<ArrayBuffer>,
  status: number,
  success: boolean,
  json: () => Promise<any>
}>