import { inBrowser, root } from 'browser'

export default inBrowser && root.__REDUX_DEVTOOLS_EXTENSION__
    ? root.__REDUX_DEVTOOLS_EXTENSION__() : f => f
