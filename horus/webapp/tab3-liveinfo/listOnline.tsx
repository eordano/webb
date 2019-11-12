import { Container, Grid, Segment, Table } from 'decentraland-ui'
import React from 'react'

export const ListOnline = () => {
  // const [ status, setStatus ] = useState({ count: { i: -150, j: -150 }, lastSent: new Date().getTime() })
  // useEffect(() => {
  //   setStatus('loading')
  //   for (let i = -150; i <= 150; i += 4) {
  //     for (let j = -150; j <= 150; j += 4) {
  //       const topic = `${Math.floor(i/4)}:${Math.floor(i/4)}`
  //       store.dispatch(protocolSubscription(topic))
  //       store.dispatch(protocolOutPosition({playerHeight: 1.6, position: {x: i * 16, y: 0, z: j * 16}, rotation: { x: 0, y: 0, z: 0, w: 1}}, topic))
  //     }
  //   }
  // })
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h3>World Sessions</h3>
              <Table basic="very">
                <Table.Header>
                  <Table.HeaderCell>Who</Table.HeaderCell>
                  <Table.HeaderCell>Session Time</Table.HeaderCell>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell>Perf Score: (95th)</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ElonMusk</Table.Cell>
                    <Table.Cell>2m:45s</Table.Cell>
                    <Table.Cell>
                      <a href="#">11,30</a>: Koko Jones
                    </Table.Cell>
                    <Table.Cell>24.56</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}
