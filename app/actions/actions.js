import firebase, {firebaseRef} from '../../firebase/index'
import moment from 'moment'

export let setSearchText = (searchText) => {
	return {
		type: "SET_SEARCH_TEXT",
		searchText
	}
}

export let addTodo = (todo) => {
	return {
		type: "ADD_TODO",
		todo
	}
}

/*Used for localStorage takes an array as argument */
export let addTodos = (todos) => {
	return {
		type: "ADD_TODOS",
		todos
	}
}
/*interaction with firebase, return a function
this pattern is called a thunk*/
export let startAddTodo = (text) => {
	/*dispatch after the data is saved in db 
	get current state of store*/
	return (dispatch, getState) => {
		let todo = {
			text: text,
			completed: false, 
			createdAt: moment().unix(), 
			completedAt: null 
		}		
		let todoRef = firebaseRef.child('todos').push(todo)
		/*Calling dispatch updates the store*/
		todoRef.then( () => {
			dispatch( addTodo({
				...todo,
				id: todoRef.key
			}) )
		} )
	}
}


export let toggleShowCompleted = () => {
	return {
		type: "TOGGLE_SHOW_COMPLETED",
	}
}

export let toggleTodo = (id) => {
	return {
		type: "TOGGLE_TODO",
		id
	}
}