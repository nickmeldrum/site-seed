import ReactDOMServer from 'react-dom/server'

import RootComponent from 'components'
import { wrapComponentInStore } from 'store'

const renderReactToString = Component => ReactDOMServer.renderToString(Component)

export default renderReactToString(wrapComponentInStore(RootComponent))
