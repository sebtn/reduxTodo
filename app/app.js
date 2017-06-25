import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import TodoApp from '././components/TodoApp'
import  '././styles/app.scss' 
import * as actions from '././actions/actions'
import TodoApi from '././api/TodoApi'
import './../firebase/index'

let store = require('././store/configureStore').configure()

store.subscribe( () => {
  let state = store.getState() 
  console.log('New state object each time store dispatches:' + '\n ', state)
  TodoApi.setTodos(state.todos)
}) 

/* action to add the todo arrays */
let initialTodos = TodoApi.getTodos()
store.dispatch(actions.addTodos(initialTodos))

'use strict'

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
 document.getElementById('root'))