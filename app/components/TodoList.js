import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Todo from './Todo'
import TodoApi from '../api/TodoApi'

export class TodoList extends Component {
/*--------------------------------------------------------------*/
	renderTodos = () => {
		let {todos, showCompleted, searchText} = this.props
		let filteredTodos = TodoApi.filterTodos(todos, showCompleted, searchText)
		if (filteredTodos.length === 0) {
			return (
				<div className="message-empty">
						<div className="alert alert-info" role="alert">
						  <strong> It's great! </strong> 
						  <br />
						  <p>There is nothing to do. You should have some pizza!</p>
						</div>
				</div>	
			)
		}
		/*Map all the 'todos' array, which is being passed as prop*/
		return filteredTodos.map( (todo) => {
			return (
				<Todo 
					key={todo.id} 
					{...todo}
			 />
			)
		})
	}
/*--------------------------------------------------------------*/
	render() {
		return(
			<div className="test-container">
				{this.renderTodos()}
			</div>
		)	
	}
}

/*--------------------------------------------------------------*/
export default connect(
		(state) => {
			return state
		}
	)(TodoList)
