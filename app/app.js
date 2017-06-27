import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import TodoApp from '././components/TodoApp'
import  '././styles/app.scss' 
import * as actions from '././actions/actions'
import TodoApi from '././api/TodoApi'
import './../firebase/index'

let store = require('././store/configureStore').configure()

store.dispatch(actions.startAddTodos())

'use strict'

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
 document.getElementById('root'))