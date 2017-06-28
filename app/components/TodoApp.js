import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as Redux from 'react-redux'

import *as actions from './../actions/actions'
  
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import TodoSearch from './TodoSearch'
import TodoApi from '../api/TodoApi'
	
'use strict'

class TodoApp extends Component {
/*--------------------------------------------------------------*/
	onLogout = (e) => {
		let {dispatch} = this.props
		e.preventDefault()	
		dispatch(actions.startLogout())
	}
/*--------------------------------------------------------------*/
	
	render() {
		return(
			<div className='main-container'>
			<div className="logout-container">
			<a href="#" onClick={this.onLogout} > Logout </a> 
			</div>
				<h1>TODO App built Redux Style</h1>
					<div className="row">
							<div className="col-sm-1 col-md-1 col-lg-3"></div>
							<div className="col-sm-10 col-md-10 col-lg-6 list-container">
							<TodoSearch />
							<TodoList /> 
							<AddTodo  />
						</div>
					<div className="col-sm-1 col-md-1 col-lg-3"></div>
				</div>
			</div>
		)	
	}
}
export default Redux.connect()(TodoApp)