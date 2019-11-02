import { Container, Grid, Tabs } from 'decentraland-ui'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Overview } from './tab1-overview/content'
import { OverviewMenu } from './tab1-overview/menu'
import { Users } from './tab2-users/content'
import { UserMenu } from './tab2-users/menu'

const INITIAL = {}
const store = createStore(state => state || INITIAL)

const menuPerTab = {
  Overview: OverviewMenu,
  Users: UserMenu
}

const contentPerTab = {
  Overview: Overview,
  Users: Users
}

export type SectionName = keyof typeof menuPerTab

const names: SectionName[] = Object.keys(menuPerTab) as SectionName[]

const slugify = (name: string) => name.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()

function getSlug(name: SectionName) {
  return slugify(name)
}
const backMap: Record<SectionSlug, SectionName> = names.reduce((cumm, next) => ({ ...cumm, [slugify(next)]: next }), {})
export type SectionSlug = ReturnType<typeof getSlug>
function getNameForSlug(name: SectionSlug): SectionName {
  return backMap[name]
}

export function HorusTabs(props: { tab: SectionName; setTab: (newTab: SectionName) => any }) {
  const { tab, setTab } = props
  const tabSlug = slugify(tab)
  return (
    <Tabs>
      {names.map(name => {
        const slug = getSlug(name)
        return (
          <Tabs.Tab key={slug} active={tabSlug === slug} onClick={() => setTab(getNameForSlug(slug))}>
            {name}
          </Tabs.Tab>
        )
      })}
    </Tabs>
  )
}

function Application(props: { tabs: any }) {
  const [tab, setTab]: [SectionName, (tabname: SectionName) => any] = React.useState('Overview') as any
  return (
    <Container>
      <HorusTabs tab={tab} setTab={setTab} />
      <Grid>
        <Grid.Column width={4}>{menuPerTab[tab]()}</Grid.Column>
        <Grid.Column width={12}>{contentPerTab[tab]()}</Grid.Column>
      </Grid>
    </Container>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <>
      <Application tabs />
    </>
  </Provider>,
  document.getElementById('root')
)
