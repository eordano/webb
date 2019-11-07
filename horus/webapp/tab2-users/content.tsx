import { Address, Center, Container, Field, HeaderMenu, Loader, Pagination, Segment, Table } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { englishTimeAgo } from '../datefun/englishTimeAgo'
import { Link } from '../route/Link'
import { routeFor } from '../route/redirectCache'

export const Users = () => {
  const [userQuery, setUserQuery] = useState('')
  const [data, innerSetData] = useState('')
  const [currentQuery, setCurrentQueryLoading] = useState(undefined)
  const [currentQueryResult, setCurrentQueryResult] = useState(undefined)
  const [debounced, setDebounced] = useState(undefined)
  function setData(data: any) {
    innerSetData(data)
    setCurrentQueryResult(userQuery)
  }
  useEffect(() => {
    ;(async function() {
      if (currentQuery === userQuery) {
        return
      }
      setCurrentQueryLoading(userQuery)
      if (debounced) {
        clearTimeout(debounced)
      }
      setDebounced(
        setTimeout(async () => {
          const response = await fetch(`http://${window.location.hostname}:1338/users/search/${userQuery}`)
          setData(await response.json())
          setCurrentQueryResult(userQuery)
        }, 1000)
      )
    })()
  }, [userQuery])
  const isLoading = currentQueryResult !== userQuery
  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <div className="ui userSearch" style={{ width: '100%' }}>
            <Field
              fluid
              placeholder="Enter the user's email, ethereum address, claimed name, or userId"
              value={userQuery}
              focus={true}
              onChange={ev => setUserQuery(ev.target.value)}
            />
          </div>
        </HeaderMenu>
        {isLoading || !data ? (
          <Loader />
        ) : !data.length ? (
          <Center> Empty results </Center>
        ) : (
          <>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Claimed Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Ethereum Address</Table.HeaderCell>
                  <Table.HeaderCell>Last Login</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {(data as any).map(userInfo => {
                  const id = userInfo.id
                  const email = userInfo.email
                  const eth_address = userInfo.eth_address
                  const created = userInfo.received_at
                  const path = routeFor('Users', 'detail/' + id)
                  return (
                    <tr key={id}>
                      <Table.Cell>
                        <Link path={path}>
                          {email || ''}
                          <br />
                          <small>{id || ''}</small>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{email || ''}</Table.Cell>
                      <Table.Cell>
                        <Address value={eth_address || ''} />
                      </Table.Cell>
                      <Table.Cell>{englishTimeAgo(new Date().getTime() - new Date(created).getTime())}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </tr>
                  )
                })}
              </Table.Body>
            </Table>
            <Pagination totalPages={10} siblingRange={2} activePage={5}></Pagination>
          </>
        )}
      </Segment>
    </Container>
  )
}
