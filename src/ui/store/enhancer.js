import { applyMiddleware, compose } from 'redux'

import devTools from './dev-tools'

const middleware = []
export default compose(applyMiddleware(...middleware), devTools)
