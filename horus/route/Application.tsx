import { Container, Grid } from 'decentraland-ui'
import React from 'react'
import { HorusTabs } from './HorusTabs'

export function Application(props: { section: string; subsection?: string; Menu?: any; Content?: any, path?: any }) {
  const { section, Menu, Content } = props
  if (!Menu) {
    return (
      <Container key={section}>
        <HorusTabs section={section} />
        <Grid>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            <Content {...props} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
  return (
    <Container key={section}>
      <HorusTabs section={section} subsection={props.subsection} />
      <Grid>
        <Grid.Column width={4}>
          <Menu section={section} subsection={props.subsection} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Content {...props} />
        </Grid.Column>
      </Grid>
    </Container>
  )
}
