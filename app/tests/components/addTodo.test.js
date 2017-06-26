import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'

import {AddTodo} from '../../components/AddTodo'
import * as actions from '../../actions' 

'use strict'

describe('Component Add To Do ', () => {

	it('Test #1: Component should exist', () => {
		expect(AddTodo).toExist()
	})

	it('Test #2: (after redux) should dispatch ADD_TODO  when valid text', () => {
			// var action = {
			// 	type: 'ADD_TODO',
			// 	text: 'Defined string'
			// }
			let someText = 'Defined string'
			let action = actions.startAddTodo(someText)

			let spy = expect.createSpy()
			let textInForm = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />)
			let $el = $(ReactDOM.findDOMNode(textInForm))

			textInForm.refs.todoPassed.value = someText
			TestUtils.Simulate.submit($el.find('form')[0])

			expect(spy).toHaveBeenCalledWith(action)
		})

	// it('Test #3: onSetText should NOT accept undefined strings', () => {
	it('Test #3: (after redux) should not dispatch ADD_TODO when valid text', () => {
		let spy = expect.createSpy()
		// let textInForm = TestUtils.renderIntoDocument(<AddTodo onSetText={spy} />)
		let textInForm = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />)
		let $el = $(ReactDOM.findDOMNode(textInForm))

		textInForm.refs.todoPassed.value = ''
		TestUtils.Simulate.submit($el.find('form')[0])

		expect(spy).toNotHaveBeenCalled()
	})

})
