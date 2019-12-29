import { Button, Checkbox, Container, HeaderMenu, Icon, Segment, Table } from 'decentraland-ui'
import React from 'react'

export const EmptyParcels = () => {
  return (
    <Container>
      <Segment>
        <HeaderMenu>
          <HeaderMenu.Left>
            <h1>Empty Parcels</h1>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Button primary>
              New &nbsp; <Icon  name="chevron right" />
            </Button>
          </HeaderMenu.Right>
        </HeaderMenu>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Submitted by</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <a href="#">Empty Parcel 1</a>
              </Table.Cell>
              <Table.Cell>Mauri</Table.Cell>
              <Table.Cell>
                <Checkbox checked/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <a href="#">Empty Parcel 2</a>
              </Table.Cell>
              <Table.Cell>Shibu</Table.Cell>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <a href="#">Empty Parcel 3</a>
              </Table.Cell>
              <Table.Cell>Shibu</Table.Cell>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  )
}
