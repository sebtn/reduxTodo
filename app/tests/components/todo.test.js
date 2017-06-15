import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'


import Todo from '../../components/Todo'

'use strict'

describe('Component Todo', () => {
	
	it('Test #1: Component Todo should exist', () => {
		expect(Todo).toExist()
	})

	it('Test# 2: it should call onToggle prop with OnClick', () => {
		let todoDummy = {
			id: 155,
			text: 'Some text here',
			completed: true
		}
		let spy = expect.createSpy()
		let todo = TestUtils.renderIntoDocument(<Todo {...todoDummy} onToggle={spy}/>)
		let $el = $(ReactDOM.findDOMNode(todo))

		TestUtils.Simulate.submit($el[0].onClick)
		expect(spy).toHaveBeenCalledWith()
	})

})