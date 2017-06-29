import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'

import router from '././router/index'
import  '././styles/app.scss' 
import * as actions from '././actions/actions'
import firebase from './../firebase/index'
let store = require('././store/configureStore').configure()

/*Redirect on login and logout*/
firebase.auth().onAuthStateChanged( (user) => {
  if (user) {
    hashHistory.push('/todos')
    store.dispatch(actions.login(user.uid))
    store.dispatch(actions.startAddTodos())
  } else {
    hashHistory.push('/')
    store.dispatch(actions.logout())
  }
})


ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
 document.getElementById('root'))