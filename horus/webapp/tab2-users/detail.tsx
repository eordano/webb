import { PassportAsPromise } from 'dcl/kernel/passports/PassportAsPromise'
import { Profile } from 'dcl/kernel/passports/types'
import { Container, Grid, Loader, Segment, Table } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { store } from '../kernel/store'
import { WorldSessions } from './worldSessions'
import { WearablesAsPromise } from '../kernel/wearables'
import { HORUS_CONFIG } from '../horus-config/config'

function ItemDetail(props) {

  const item = props.wearables.find(it => it.id == props.item)

  const itemThumbUrl = HORUS_CONFIG.CONTENT_SERVER_URL + "/contents/" + item.thumbnail

  return <Table.Row key={props.item}>
    <Table.Cell><img style={{width: '64px', height:'64px'}} src={itemThumbUrl} /></Table.Cell>
    <Table.Cell>{item.i18n[0].text /* TODO: Get language from browser? */}</Table.Cell> 
    <Table.Cell>
      <a href="#">#0</a>/<a href="#">0</a>
    </Table.Cell>
    <Table.Cell>never days ago</Table.Cell>
  </Table.Row>
}

export const UserDetail = (props: any) => {
  const userId = 'email|' + props.pathname.split('-')[1]
  const [wearables, setWearables] = useState(undefined)
  const [profile, setProfile] = useState(undefined)

  useEffect(() => {
    ; (async function () {
      if (profile !== undefined) {
        return
      }
      setProfile(null)
      const response = await PassportAsPromise(store)(userId)
      setProfile(response)
    })()
  })

  useEffect(() => {
    (async function () {
      if (wearables !== undefined) {
        return
      }
      const response = await WearablesAsPromise(store)()
      setWearables(response)
    })()
  });

  if (!profile) {
    return <div><Loader size="massive" /></div>
  }
  const passport: Profile = profile
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>{passport.name}</h1>
              <h5 style={{ marginTop: 0 }}>{passport.email}</h5>
              <h4>{userId}</h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <img src={passport.snapshots.body} width="100%" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <WorldSessions userId={userId} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>Inventory</h3>
              {wearables && <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Rarity (link)</Table.HeaderCell>
                  <Table.HeaderCell>Acquired</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {passport.inventory.map(item => <ItemDetail item={item} wearables={wearables}></ItemDetail>)}
                </Table.Body>
              </Table>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}
