import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Navbar } from './Navbar'

function mapState(state: any) {
  return {
    currentPage: state.router.location.pathname,
    isLoggingIn: false,
    isLoggedIn: false,
    profileLoaded: false,
    userId: ''
  }
}

export default connect(
  mapState,
  { login: () => push('/login'), pushLocation: (key: string) => push(key) }
)(Navbar)
