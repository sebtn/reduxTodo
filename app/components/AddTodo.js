import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'

'use strict'

export class AddTodo extends Component {

/*-----------------------------------------------------------------*/
	onSubmit = (e) => {
		e.preventDefault()
		let {dispatch} = this.props
		let text = this.refs.todoPassed.value
		if (text.length > 0 ) {
			/*this fires up the callback ```onSetText``` to parent
			note that it is not defined, it is just declared*/
			this.refs.todoPassed.value = ' '
			/* this.props.onSetText(text)
			changed the cb for the method inside the todosReducer */			dispatch(actions.addTodo(text))
		} else {
			this.refs.todoPassed.focus()
		}
	}

/*-----------------------------------------------------------------*/
	render() {
		return(
			<div className="add-todo-container">
				<form 
					className="Add-todo-form" 
					onSubmit={this.onSubmit} >
				  <div className="form-group">
				    <input  
					    type="text" 
					    className="form-control"
					     ref="todoPassed" 
					     placeholder="Write todo" />
				    <button 
					    type="submit" 
					    className="btn btn-primary btn-lg" >
					    Add Todo
				    </button>
				  </div>
				</form>				  
			</div>
		)	
	}
}
/*-----------------------------------------------------------------*/
/*Add todo doesn't need  props from the state obj 
there is no need to reference anything inside connect*/
export default connect()(AddTodo)