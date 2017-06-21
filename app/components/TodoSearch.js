import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as actions from '../actions/actions'

'use strict'

export class TodoSearch extends Component {
/*--------------------------------------------------------------*/
/*	handleSearch = () => {
		let searchText = this.refs.searchText.value
		let showCompleted = this.refs.showCompleted.checked

		this.props.onSearch(showCompleted, searchText)
	}*/


/*--------------------------------------------------------------*/
	render() {
		let {dispatch, showCompleted, searchText} = this.props
		return(
			<div className="search-container">
				<div className="form-group" >
				    <input ref="searchText" 
					    className="form-control" 
					    type="search" 
					    placeholder="Search Todos"  
					    value={searchText} 
				    	onChange={ () => {
					    	let searchText = this.refs.searchText.value
					    	dispatch( actions.setSearchText(searchText) )
					    }} />
				    <div className="form-check">
					    <label className="form-check-label">
				        <input ref="showCompleted" 
				        	checked={showCompleted}
					        className="form-check-input" 
					        type="checkbox" 
					        onChange={ () => {
							    	dispatch( actions.toggleShowCompleted() )
					        }} />
				        <p className="text">Show completed todos </p>
					    </label>
				    </div>
				</div>
			</div>
		)	
	}
}
/*--------------------------------------------------------------*/

export default connect(
	(state) => {
		return {			
			showCompleted: state.showCompleted,
			searchText: state.searchText 
		}
	}	
)(TodoSearch)