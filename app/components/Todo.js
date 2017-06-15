import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

'use strict'

export default class Todo extends Component {
	render() {
		let {createdAt, completedAt, completed, text, id} = this.props
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
				<div className={todoClassName} onClick={ () => {
					this.props.onToggle(id) }}>
					<div>
						<input  className="form-check-input" type="checkbox" 
						defaultChecked={completed} />
					</div>
					<div>
						<p className="text"> {text} </p>
						<div className="todo-subtext"> {renderedDate()} </div>		
					</div>
				</div>
		)	
	}
}