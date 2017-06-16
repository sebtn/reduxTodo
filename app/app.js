import React from 'react'
import ReactDOM from 'react-dom'

import TodoApp from '././components/TodoApp'
import  '././styles/app.scss' 

import * as actions from '././actions/actions'
// import  {configure}  from '././store/configureStore'
let store = require('././store/configureStore').configure()
'use strict'

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(actions.addTodo('Clean the yard'))
store.dispatch(actions.toggleShowCompleted() )
store.dispatch(actions.setSearchText('yard'))
store.dispatch(actions.toggleShowCompleted() )

ReactDOM.render(<TodoApp />, document.getElementById('root'))