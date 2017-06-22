import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import TodoApp from '././components/TodoApp'
import  '././styles/app.scss' 
import * as actions from '././actions/actions'
// import  {configure}  from '././store/configureStore'
let store = require('././store/configureStore').configure()

'use strict'

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)



// ReactDOM.render(<TodoApp />, document.getElementById('root'))

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
 document.getElementById('root'))