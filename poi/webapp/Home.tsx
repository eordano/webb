import { Button, Grid, Hero, Icon, Page, Segment } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { deletePoi, pinit } from './api'
import { CreatePoi } from './CreatePoi'
import { EditPoi } from './EditPoi'

function Everything(props: any) {
  const [deleteActive, setDeleteActive] = useState(false)
  const [newModal, setNewModal] = useState(false)
  const [editPoi, setEditPoi] = useState(undefined)
  const [pois, setPois] = useState(undefined)

  useEffect(() => {
    async function fetchPois() {
      if (pois !== undefined) {
        return
      }
      setPois({})
      const request = await fetch(`//${window.location.hostname}:2345/poi`)
      if (request.status === 200) {
        const body = await request.json()
        return setPois(body)
      }
    }
    fetchPois()
  })

  return (
    <Page isFullscreen>
      <Hero centered>
        <Hero.Header>POI</Hero.Header>
        <Hero.Description>Parcels of Interest</Hero.Description>
      </Hero>
      {newModal && (
        <CreatePoi
          onCancel={() => setNewModal(false)}
          onFinish={() => [setDeleteActive(false), setNewModal(false), setPois(undefined)]}
        />
      )}
      {editPoi !== undefined && (
        <EditPoi
          id={editPoi}
          {...editPoi}
          onCancel={() => setEditPoi(undefined)}
          onFinish={() => [setEditPoi(undefined), setDeleteActive(false), setPois(undefined)]}
        />
      )}
      <Grid>
        <Grid.Row>&nbsp;</Grid.Row>
        {pois &&
          Object.values(pois).map((poi: any) => {
            return (
              <Grid.Row key={poi.id}>
                <Grid.Column width={3} />
                <Grid.Column width={10}>
                  <Segment>
                    <Grid>
                      <Grid.Column width={4} style={{ textAlign: 'center' }}>
                        <Grid.Row>
                          <img width='100%' src={poi.screenshot} />
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Grid.Row>
                          <h2 style={poi.priority ? { color: '#ff2d55' } : {}}>
                            {poi.priority ? <Icon size='small' name='pin' /> : <span />}
                            {poi.name}
                          </h2>
                          <h4>{poi.description}</h4>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Grid.Row style={{ textAlign: 'center' }}>
                          <Button
                            primary
                            inverted
                            target='_blank'
                            href={`https://explorer.decentraland.org/?position=${poi.x},${poi.y}`}
                          >
                            ({poi.x},{poi.y}) <Icon name='chevron right' />
                          </Button>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid>
                            {deleteActive && (
                              <Grid.Column
                                width={5}
                                onClick={() => pinit(poi, () => setPois(undefined))}
                                style={{ cursor: 'pointer', marginTop: '20px', textAlign: 'right', color: '#ccc' }}
                              >
                                <Icon name='pin' style={poi.priority ? { color: '#ff2d55' } : {}} />
                              </Grid.Column>
                            )}
                            {deleteActive && (
                              <Grid.Column
                                width={5}
                                onClick={() => setEditPoi(poi)}
                                style={{ cursor: 'pointer', marginTop: '20px', textAlign: 'center', color: '#ccc' }}
                              >
                                <Icon name='edit' />
                              </Grid.Column>
                            )}
                            {deleteActive && (
                              <Grid.Column
                                width={5}
                                onClick={() => deletePoi(poi.id, () => setPois(undefined))}
                                style={{ cursor: 'pointer', marginTop: '20px', textAlign: 'center', color: '#ccc' }}
                              >
                                <Icon name='x' />
                              </Grid.Column>
                            )}
                          </Grid>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            )
          })}
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={() => setDeleteActive(!deleteActive)}>Edit</Button>
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: 'center' }}></Grid.Column>
                <Grid.Column width={4} style={{ textAlign: 'right' }}>
                  <Button primary onClick={() => setNewModal(true)}>
                    New
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Page>
  )
}

export function renderApp() {
  ReactDOM.render(<Everything />, document.getElementById('root'))
}

renderApp()
