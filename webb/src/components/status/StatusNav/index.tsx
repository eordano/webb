import { connect } from 'react-redux'

import { StatusNav as StatusNavComponent } from './StatusNav'
import { context } from '../../../context'

export const StatusNav: any = connect(
  (state: any) => ({
    current: window.location.pathname,
    systems: state.systems
  }),
  () => ({}),
  context
)(StatusNavComponent)
