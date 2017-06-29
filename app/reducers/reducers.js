import uuid from 'node-uuid'
import moment from 'moment'

'use strict'

/*-----------------------------------------------------------------*/
export let searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case "SET_SEARCH_TEXT":
			return action.searchText
		default: 
			return state			
	}
}

/*-----------------------------------------------------------------*/
export let showCompletedReducer = (state = false, action) => {
	switch (action.type) {
		case "TOGGLE_SHOW_COMPLETED":
			return !state
		default: 
			return state			
	}
}			

/*-----------------------------------------------------------------*/
export let todosReducer = (state = [],  action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [
				...state,
				/*reference to firebase action method here*/
				action.todo
			]
		case "UPDATE_TODO":
			return state.map( (todo) => {
				if (todo.id === action.id) { 
					return {
						/*Two spread operators, the second one overrides the first*/
						...todo,
						...action.updates
					}
				} else {
					return todo
				}
			})
		case "ADD_TODOS":
			return [
				...state,
				...action.todos
			]				
		case "LOGOUT":
			return []			
		default: 
			return state			
	}
}				

/*-----------------------------------------------------------------*/
export let authReducer = (state = {}, action) => {
	switch (action.type) {
		case "LOGIN":
      return {
      	uid: action.uid
      }
		case "LOGOUT": 
			return {}
		default:
			return state
	}
}












