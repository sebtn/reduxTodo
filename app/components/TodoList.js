import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Todo from './Todo'

export class TodoList extends Component {
/*--------------------------------------------------------------*/
	renderTodos = () => {
		let {todos} = this.props
		if (todos.length === 0) {
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
		return todos.map( (todo) => {
			return (
				<Todo 
				key={todo.id} 
				 // onToggle={this.props.onToggle} 
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
// let mapStateToProps = (state) =>  {
// 	return { 
// 		todos: state.todos,
// 	}
// }

export default connect(
		(state) => {
			return {
				todos: state.todos
			}
		}
	)(TodoList)
