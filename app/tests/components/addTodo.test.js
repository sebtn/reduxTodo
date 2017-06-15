import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'

import AddTodo from '../../components/AddTodo'

'use strict'

describe('Component Add To Do ', () => {

	it('Test #1: Component should exist', () => {
		expect(AddTodo).toExist()
	})

	it('Test #2: onSetText should accept only defined strings', () => {
		let spy = expect.createSpy()
		let textInForm = TestUtils.renderIntoDocument(<AddTodo onSetText={spy} />)
		let $el = $(ReactDOM.findDOMNode(textInForm))

		textInForm.refs.todoPassed.value = 'Defined string'
		TestUtils.Simulate.submit($el.find('form')[0])

		expect(spy).toHaveBeenCalledWith('Defined string')
	})	

	it('Test #3: onSetText should NOT accept undefined strings', () => {
		let spy = expect.createSpy()
		let textInForm = TestUtils.renderIntoDocument(<AddTodo onSetText={spy} />)
		let $el = $(ReactDOM.findDOMNode(textInForm))

		textInForm.refs.todoPassed.value = ''
		TestUtils.Simulate.submit($el.find('form')[0])

		expect(spy).toNotHaveBeenCalled()
	})

})
