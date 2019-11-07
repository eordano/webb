const API = parseInt(window.location.port, 10) > 1000 ? `//${window.location.hostname}:2345/poi` : '/poi'
export async function createPoi(data: any, emptyCacheFun: Function) {
  const result = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json ' },
    body: JSON.stringify(data)
  });
  console.log(result);
  emptyCacheFun();
}
export async function pinit(data: any, emptyCacheFun: Function) {
  const { id } = data
  const result = await fetch(API + '/' + id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json ' },
    body: JSON.stringify({ ...data, priority: data.priority ? 0 : 10000 })
  });
  console.log(result);
  emptyCacheFun();
}
export async function editPoi(id: string, data: any, emptyCacheFun: Function) {
  const result = await fetch(API + '/' + id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json ' },
    body: JSON.stringify(data)
  });
  console.log(result);
  emptyCacheFun();
}
export async function deletePoi(id: string, emptyCacheFun: Function) {
  const result = await fetch(API + '/' + id, { method: 'DELETE', headers: { 'content-type': 'application/json ' } });
  console.log(result);
  emptyCacheFun();
}
