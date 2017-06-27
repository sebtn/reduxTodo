import firebase, {firebaseRef} from '../../firebase/index'
// import firebase, {firebaseRef, githubProvider} from '../../firebase/index'
import moment from 'moment'


/*-------------------------------------------------------*/
export let setSearchText = (searchText) => {
	return {
		type: "SET_SEARCH_TEXT",
		searchText
	}
}

/*-------------------------------------------------------*/
export let addTodo = (todo) => {
	return {
		type: "ADD_TODO",
		todo
	}
}

/*-------------------------------------------------------*/
/*Used for localStorage takes an array as argument 
prints to screen when passed through the reducer*/
export let addTodos = (todos) => {
	return {
		type: "ADD_TODOS",
		todos
	}
}

/*-------------------------------------------------------*/
export let startAddTodos = () => {
	return (dispatch, getState) => {
		let todosRef = firebaseRef.child('todos')
		return todosRef.once('value').then( (snapshot) => {
			let parsedTodos = []
			let todos = snapshot.val() || {}
			Object.keys(todos).forEach( (todoId) => {
				parsedTodos.push({
					id: todoId,
					...todos[todoId]
				})
			})
			dispatch(addTodos(parsedTodos))
		})
	}
}

/*-------------------------------------------------------*/
/* Async interaction with firebase, returning 
a function... this pattern is called a thunk*/
export let startAddTodo = (text) => {
	/*dispatch actions after the data is saved in db, 
	get current state of store*/
	return (dispatch, getState) => {
		let todo = {
			text: text,
			completed: false, 
			createdAt: moment().unix(), 
			completedAt: null 
		}		
		let todoRef = firebaseRef.child('todos').push(todo)
		/*Calling dispatch updates the store, should explicitly 
		return, else the test will not receive the promise, 
		returning undefined even though method works */
		return todoRef.then( () => {
			dispatch( addTodo({
				...todo,
				id: todoRef.key
			}) )
		} )
	}
}

/*-------------------------------------------------------*/
export let toggleShowCompleted = () => {
	return {
		type: "TOGGLE_SHOW_COMPLETED",
	}
}

/*-------------------------------------------------------*/
export let updateTodo = (id, updates) => {
	return {
		type: "UPDATE_TODO",
		id,
		updates
	}
}

/*-------------------------------------------------------*/
export let startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		// let todoRef = firebaseRef.child('todos/' + id)
		let todoRef = firebaseRef.child(`todos/${id}`)
		let updates = {
			completed,
			completedAt:completed ? moment().unix() : null 	
	}
	/*Returning a promise allow chaining in the tests*/
	return todoRef.update(updates)
		.then(() => {
			dispatch(updateTodo(id, updates) )
		})
	}
}

/*-------------------------------------------------------*/
export let startLogin = () => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(githubProvider)
		.then( (result) => {

		}, (error)=> {

		})
	}
}
/*-------------------------------------------------------*/
export let startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut()
		.then(()=> {

		})
	}
}

