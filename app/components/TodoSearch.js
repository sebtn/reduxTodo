import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as actions from '../actions/actions'

'use strict'

export class TodoSearch extends Component {
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
					    <label className="custom-control custom-checkbox">
				        <input ref="showCompleted" 
				        	checked={showCompleted}
					        className="custom-control-input" 
					        type="checkbox" 
					        onChange={ () => {
							    	dispatch( actions.toggleShowCompleted() )
					        }} />
					        <span className="custom-control-indicator"></span>
					        <span className="custom-control-description">Show completed ...</span>
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