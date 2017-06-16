// import redux from 'redux'
let redux = require('redux')

import {searchTextReducer,
	showCompletedReducer, 
	todosReducer} from './../reducers/reducers'

export let configure = () => {
	let reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		addTodo: todosReducer
	})
	 let store = redux.createStore(reducer, redux.compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f 
		))
	return store
}