import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'

import TodoSearch from '../../components/TodoSearch'

'use strict'

describe('Component TodoSearch exists', () => {
	
	it('test #1: verifies the component exists', () => {
		expect(TodoSearch).toBe(TodoSearch)
	})

	// it('test #2: onSearch should get called with input text on search bar', () => {
	it('test #2: (after redux) should dispatch "SET_SEARCH_TEXT" on input change', () => {
		let action = {
			type: "SET_SEARCH_TEXT",
			searchText: searchText
		}
		let searchText = 'Acid test'
		let spy = expect.createSpy()
		// let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)

		todoSearch.refs.searchText.value = searchText
		TestUtils.Simulate.change(todoSearch.refs.searchText.value)

		// expect(spy).toHaveBeenCalledWith(false, 'Acid test')
		expect(spy).toHaveBeenCalledWith(action)
	})


	// it('test #3: it should called onSearch when check box is used ', () => {
	it('test #3: (after redux) it should dispatch "TOGGLE_SHOW_COMPLETED" on checkbox checked ', () => {
		let action = {
			type: "TOGGLE_SHOW_COMPLETED"
		}
		let spy = expect.createSpy()
		// let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)
		let showCompleted = false

		todoSearch.refs.showCompleted.checked = showCompleted
		TestUtils.Simulate.change(todoSearch.refs.showCompleted.checked)

		// expect(spy).toHaveBeenCalledWith(false, '')
		expect(spy).toHaveBeenCalledWith(action)
	})

})