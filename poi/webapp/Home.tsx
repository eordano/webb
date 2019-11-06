import { Button, Field, Grid, Icon, Modal, Page, Segment, Hero } from 'decentraland-ui'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

renderApp(<Everything />)

function Everything() {
  const [deleteActive, setDeleteActive] = useState(false)
  const [newModal, setNewModal] = useState(false)
  return (
    <Page isFullscreen>
      <Hero centered>
        <Hero.Header>POI</Hero.Header>
        <Hero.Description>Parcels of Interest</Hero.Description>
      </Hero>
      {newModal && (
        <Modal open={true}>
          <Modal.Header>Submit a scene</Modal.Header>
          <Modal.Content>
            <Field label="Name" id="name" placeholder="Cool scene #42" />
            <Field label="Screenshot" id="screenshot" placeholder="https://some.domain.com/image.png" />
            <Grid>
              <Grid.Column width="6">
                <Field label="x" id="x" type="number" placeholder="-140" />
              </Grid.Column>
              <Grid.Column width="2"></Grid.Column>
              <Grid.Column width="6">
                <Field label="y" id="y" type="number" placeholder="99" />
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setNewModal(false)}>Cancel</Button>
            <Button primary onClick={() => setNewModal(false)}>
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      <Grid>
        <Grid.Row>&nbsp;</Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4} style={{ textAlign: 'center' }}>
                    <img
                      width="100%"
                      src="https://media.discordapp.net/attachments/500732694100181002/641646818131968016/6.png?width=800&height=450"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h2>Scary Halloween</h2>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button primary>Go to 12,34</Button>
                    {deleteActive && (
                      <p style={{ marginTop: '20px', textAlign: 'right', color: '#ccc' }}>
                        <Icon name="x" />
                      </p>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button onClick={() => setDeleteActive(!deleteActive)}>Delete</Button>
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: 'center' }}></Grid.Column>
                <Grid.Column width={4}>
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

export function renderApp(paths: any) {
  ReactDOM.render(paths, document.getElementById('root'))
}
