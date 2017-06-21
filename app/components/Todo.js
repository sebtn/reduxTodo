import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'react-redux'

import * as actions from '../actions/actions'

'use strict'
class Todo extends Component {
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
				<div className={todoClassName} 
					onClick={ () => { this.props.onToggle(id) } }
				>
					<div>
						<label className="custom-control custom-checkbox">
							<input  
								className="custom-control-input" 
								type="checkbox" 
								defaultChecked={completed} />
							<span className="custom-control-indicator"></span>
						</label>
					</div>
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

function mapStateToProps(state) {
  return {
 //  	id: state.todos
 }
}

/*-----------------------------------------------------------------*/
export default connect(mapStateToProps)(Todo)