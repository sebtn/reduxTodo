import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'

import TodoList from '../../components/TodoList'
import Todo from '../../components/Todo'

'use strict'

describe('Component TodoList', () => {

	it('Test #1: Component TodoList should exist', () => {
		expect(TodoList).toExist()
	})

	it('Test#2: should render one Todo for each item in array', () => {
		let todos = [
			{id:1, text:'Some text for item 1'},
			{id:2, text:'some text for item 2' }
		]
		/*from dom */
		let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
		let todosRendered = TestUtils.scryRenderedComponentsWithType(todoList, Todo)

		expect(todos.length).toBe(todosRendered.length)
})

})