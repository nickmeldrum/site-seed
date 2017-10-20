import ReactDOMServer from 'react-dom/server'

import RootComponent from 'components'

const renderReactToString = Component => ReactDOMServer.renderToString(Component)

export default renderReactToString(RootComponent)
