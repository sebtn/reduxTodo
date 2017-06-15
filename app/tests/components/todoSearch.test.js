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

	it('test #2: onSearch should get called with input text on search bar', () => {
		let spy = expect.createSpy()
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let searchText = 'Acid test'

		todoSearch.refs.searchText.value = searchText
		TestUtils.Simulate.change(todoSearch.refs.searchText.value)

		expect(spy).toHaveBeenCalledWith(false, 'Acid test')
	})


	it('test #3: it should called onSearch when check box is used ', () => {
		let spy = expect.createSpy()
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let showCompleted = false

		todoSearch.refs.showCompleted.checked = showCompleted
		TestUtils.Simulate.change(todoSearch.refs.showCompleted.checked)

		expect(spy).toHaveBeenCalledWith(false, '')
	})

})