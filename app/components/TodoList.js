import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

import * as actions from '../actions/actions'
import Todo from './Todo'

class TodoList extends Component {
/*--------------------------------------------------------------*/
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
				<Todo key={todo.id} 
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
function mapStateToProps(state)  {
	return { todos: state.todos }
}

/*--------------------------------------------------------------*/
// function mapDispatchToProps(dispatch) {
// 	  return bindActionCreators({ onToggle: onToggle  }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default connect(mapStateToProps)(TodoList)
