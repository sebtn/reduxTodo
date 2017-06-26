import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// import {toggleTodo} from '../actions/actions'
import * as actions from '../actions/actions'

'use strict'
export class Todo extends Component {
	render() {
		let {createdAt, completedAt, completed, text, id, dispatch} = this.props
		let todoClassName = completed ? 'todo todo-completed' : 'todo'
	
/*--------------------------------------------------------------*/
	let renderedDate = () => {
		let message = '  Created '
		let timestamp = createdAt
		
		if (completed) {
			let message = '  Completed  '
			let timestamp = completedAt
			return message + 
				moment.unix(timestamp).format('MMM Do YYYY @ h:mm a') 
		}
		return message + 
			moment.unix(timestamp).format('MMM Do YYYY @ h:mm a') 
	} 

/*--------------------------------------------------------------*/
		return(
			<div className={todoClassName} onClick={ () =>  { 
						dispatch(actions.startToggleTodo(id, !completed))
					}}>
					<label className="custom-control custom-checkbox" >
						<input  
							className="custom-control-input" 
							type="checkbox" 
							defaultChecked={completed} />
						<span className="custom-control-indicator"></span>
					</label>
					<div>
						<p className="text"> {text} </p>
						<div className="todo-subtext"> 
							{renderedDate()} 
						</div>		
					</div>
			</div>
		)	
	}
}

/*-----------------------------------------------------------------*/
export default connect()(Todo)
