import $ from 'jquery'

/*Set and fetch items form storage*/
module.exports = {
	filterTodos: function (todos, showCompleted, searchText) {
		let filteredTodos = todos
		/*by show completed*/
		filteredTodos = filteredTodos.filter( (todo) => {
			return !todo.completed || showCompleted 
		})
		/*Sorting filter*/
		filteredTodos.sort( (a, b) => {
			if (!a.completed  && b.completed) { return -1}
			else if (a.completed  && !b.completed) { return  1}
			else { return 0	}
		})
		/*Filter by text*/
		filteredTodos = filteredTodos.filter( (todo) => { 
			let textLowerCase = todo.text.toLowerCase()
			/*indexOf look for matching strings*/
			return searchText.length === 0 || textLowerCase.indexOf(searchText) > -1
		})
		return filteredTodos
	},
}	