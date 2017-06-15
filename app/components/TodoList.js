import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Todo from './Todo'

'use strict'

export default class TodoList extends Component {

	renderTodos = () => {
		if (this.props.todos.length === 0) {
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
		return this.props.todos.map( (todo) => {
			return (
				<Todo key={todo.id} {...todo}
				 onToggle={this.props.onToggle} />
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