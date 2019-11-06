import { createApp } from './app'

{
  createApp(2345)
  console.log(`> Listening on port: 2345
> help endpoints
  - GET /poi
      : lists all the parcels of interest
  - POST /poi
      : submit a new point of interest
  - GET /poi/:id
      : get a particular poi
  - DELETE /poi/:id
      : delete a poi
  - PUT /poi/:id
      : update a poi

> Waiting for queries...`)
}
