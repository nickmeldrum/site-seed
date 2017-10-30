import { Record } from 'immutable'

const customerRecord = Record({
  name: null
})

export default customerRecord({
  name: 'Fred'
})
