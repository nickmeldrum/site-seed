import { connect } from 'react-redux'

import { updateName } from 'model/customer/actions'
import Greeting from './Greeting'

export default connect(
  state => ({name: state.customer.name}),
  { updateName }
)(Greeting)
