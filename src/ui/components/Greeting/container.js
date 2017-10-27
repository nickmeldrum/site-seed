import { connect } from 'react-redux'

import updateName from 'model/customer/actions/update-name'
import Greeting from './Greeting'

export default connect(
  state => ({name: state.customer.name}),
  { updateName }
)(Greeting)
