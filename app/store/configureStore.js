import {combineReducers} from 'redux'
/*SInce there is no default redux*/
import * as redux from 'redux'
import thunk from 'redux-thunk'

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
	 	redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f 
	))
	return store
}