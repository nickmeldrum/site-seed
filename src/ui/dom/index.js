import ReactDOM from 'react-dom'

const containerElement = window.document.getElementById('container')

export default Component => ReactDOM.hydrate(Component, containerElement)
