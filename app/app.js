import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Route, Router, 
  IndexRoute, hashHistory, Link} from 'react-router'

import TodoApp from '././components/TodoApp'
import Login from '././components/Login'
import  '././styles/app.scss' 
import * as actions from '././actions/actions'
import TodoApi from '././api/TodoApi'
import './../firebase/index'

let store = require('././store/configureStore').configure()

store.dispatch(actions.startAddTodos())

'use strict'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="/todos" component ={TodoApp} />
        <IndexRoute component ={Login} />
      </Route>
    </Router>
  </Provider>,
 document.getElementById('root'))