import ReactDOM from 'react-dom'

import RootComponent from 'components'
import { getElementById } from 'browser/document'

ReactDOM.hydrate(RootComponent, getElementById('container'))
