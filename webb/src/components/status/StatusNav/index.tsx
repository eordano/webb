import { connect } from 'react-redux'

import { StatusNav as StatusNavComponent } from './StatusNav'

export const StatusNav: any = connect(
  (state: any) => ({
    current: window.location.pathname,
    systems: state.systems
  }),
  () => ({}),
  context
)(StatusNavComponent)
