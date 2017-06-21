import {combineReducers} from 'redux'
let redux = require('redux')

import {searchTextReducer,
	showCompletedReducer, 
	todosReducer} from './../reducers/reducers'

export let configure = (initialState = {}) => {
	let reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer
	})
	 let store = redux.createStore(reducer, initialState, redux.compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f 
		))
	return store
}