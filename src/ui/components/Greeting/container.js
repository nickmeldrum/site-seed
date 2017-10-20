import { connect } from 'react-redux'

import Greeting from './Greeting'

export default connect(state => ({name: state.customer.name}))(Greeting)
