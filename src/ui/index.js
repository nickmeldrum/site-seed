import { wrapComponentInStore } from 'store'
import RootComponent from 'components'
import renderReactToDom from 'dom'

renderReactToDom(wrapComponentInStore(RootComponent))
