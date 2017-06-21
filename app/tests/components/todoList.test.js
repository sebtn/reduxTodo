import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'
import {Provider} from 'react-redux'

import TodoList from '../../components/TodoList'
import Todo from '../../components/Todo'

let configureStore = require('../../store/configureStore')

'use strict'

describe('Component TodoList', () => {

	it('Test #1: Component TodoList should exist', () => {
		expect(TodoList).toExist()
	})

	it('Test#2: (after redux) should render one Todo for each item in array', () => {
		let todos = [{
			id:1, 
			text:'Some text for item 1',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		},
		{
			id:2, 
			text:'some text for item 2',
			completed: false,
			completedAt: undefined,
			createdAt: 500 
		}]
		let store = configureStore.configure({
			todos: todos
		})
		let provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<TodoList />
			</Provider>
		)
		/*from dom */
		// let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
		let todoList = TestUtils.scryRenderedComponentsWithType(provider, TodoList)[0]
		let todosRendered = TestUtils.scryRenderedComponentsWithType(todoList, Todo)

		expect(todos.length).toBe(todosRendered.length)
})

})