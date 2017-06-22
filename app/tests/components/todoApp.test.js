import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import {Provider} from 'react-redux'

import TodoApp from '../../components/TodoApp'
let configureStore = require('../../store/configureStore')

'use strict'

describe('Component TodoApp', () => {
	
	it('Test #1: Component TodoApp should exist', () => {
		expect(TodoApp).toExist()
	})

	it('Test #1: (after redux) should render TodoList', () => {
		let store = configureStore.configure()
		let provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<TodoApp />
			</Provider>
		)
		let todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp[0])
		let todoList =  TestUtils.scryRenderedComponentsWithType(todoApp, Todolist)

		expect(TodoList.length).toEqual(1)
	})

})