import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'

import firebase from '../../firebase/index'
import TodoApp from './../components/TodoApp'
import Login from './../components/Login'

/*-------------------------------------------------------*/
/*Middlewares: manage root private and public*/
let requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/')
  }
  next()
}

/*-------------------------------------------------------*/
let redirectIfLogged = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos')
  }
  next()
}

/*-------------------------------------------------------*/
export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="/todos" component ={TodoApp} onEnter={requireLogin} />
      <IndexRoute component ={Login} onEnter={redirectIfLogged} />
    </Route>
  </Router>
)