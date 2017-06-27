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
	render() {
		return(
			<div className='main-container'>
			<div className="logout-container">
				<a href="#" >Logout</a>
			</div>
				<h1>ToDO App built Redux Style</h1>
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