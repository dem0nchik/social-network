import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import App from './Containers/App'
import store from './store/store'
import 'normalize.css'
import './style.css'


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)