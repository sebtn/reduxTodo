import React, {Component} from 'react'
import PropTypes from 'prop-types'
import uuid from 'node-uuid'
import moment from 'moment'

import TodoList from './TodoList'
import AddTodo from './AddTodo'
import TodoSearch from './TodoSearch'
import TodoApi from '../api/TodoApi'
	
'use strict'

export default class TodoApp extends Component {
	constructor() {
		super()
		this.state = {
			showCompleted: false,
			searchText: '',
			todos: TodoApi.getTodos()
		}
	}

/*--------------------------------------------------------------*/
/* ant time we make changes to the state or props, setTodos*/
	componentDidUpdate = () => {
		TodoApi.setTodos(this.state.todos)
	}

/*--------------------------------------------------------------*/
	handlerAddTodo = (text) => {
		this.setState({
			todos: 
			[
				...this.state.todos, 
				{ id: uuid(), text: text, completed: false, 
					createdAt: moment().unix(), completedAt: undefined }
			],
		})
	}

/*--------------------------------------------------------------*/
componentWillUpdate(nextProps, nextState) {


} 

/*--------------------------------------------------------------*/
// handleToggle = (id) => {
// 	let updatedTodos = this.state.todos.map( (todo) => {
// 		if (todo.id === id) { 
// 			todo.completed = !todo.completed 
// 			todo.completedAt = todo.completed ?  moment().unix() : undefined
// 		}
// 		return todo
// 	})
// 	this.setState({todos: updatedTodos})
// }

/*--------------------------------------------------------------*/
handleSearch = (showCompleted, searchText) => {
	this.setState({
		showCompleted: showCompleted,
		searchText: searchText.toLowerCase()
	})
}

/*--------------------------------------------------------------*/
	render() {
		let {todos, showCompleted, searchText} = this.state
		let filteredTodos = TodoApi.filterTodos(todos, showCompleted, searchText)
		return(
			<div className='main-container'>
				<h1>ToDO App built with ReactJs and caffeine</h1>
				<div className="row">
					<div className="col-sm-1 col-md-1 col-lg-3"></div>
					<div className="col-sm-10 col-md-10 col-lg-6 list-container">
						<TodoSearch onSearch={this.handleSearch} />
						<TodoList 
							// todos={filteredTodos} 
							// onToggle={this.handleToggle} 
						/> 
						<AddTodo onSetText={this.handlerAddTodo} />
					</div>
					<div className="col-sm-1 col-md-1 col-lg-3"></div>
				</div>
			</div>
		)	
	}
}