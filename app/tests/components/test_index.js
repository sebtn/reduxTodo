import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'

/*Import components*/
import Todo from '../../components/Todo'
import TodoList from '../../components/TodoList'
import TodoApp from '../../components/TodoApp'
import AddTodo from '../../components/AddTodo'
import TodoSearch from '../../components/TodoSearch'
import TodoApi from '../../api/TodoApi'

/*Import all as actions so we can use the "alias" actions*/
import * as actions from '../../actions/actions'
import {setSearchText, 
	addTodo, 
	toggleShowCompleted, 
	toggleTodo}  from '../../actions/actions'

/*import reducers*/
import df from 'deep-freeze-strict'
import * as reducers from '../../reducers/reducers'
import {searchTextReducer,
	showCompletedReducer, 
	todosReducer} from '../../reducers/reducers'
import uuid from 'node-uuid'
import moment from 'moment'

'use strict'
/*require all modules ending in "_test" from the
current directory and all subdirectories*/
let testsContext = require.context(".", true, /_test$/)
testsContext.keys().forEach(testsContext)

/*Begin tests*/
/*--------------------------------------------------------------*/
/*Main: app Component*/
describe('Main App', () => {

	it('The App should be testable', () => {
		expect(1).toBe(1)
	})

})

/*Test todoAPI*/
/*--------------------------------------------------------------*/
describe('TodoApi component', () => {

	beforeEach( () => {
		localStorage.removeItem('todos')
	})

	it('Test #1: Api should exists', () => {
		expect(TodoApi).toExist()
	})

	it('test #2: getTodos should return empty array for bad storage', () => {
		let actualTodos = TodoApi.getTodos()
		expect(actualTodos).toEqual([])
	})

	it('test #3: getTodos should return valid array for proper storage', () => {
		let todos = [{
			id: 23,
			text: 'some text',
			completed: false
		}]
		localStorage.setItem('todos', JSON.stringify(todos))
		let actualTodos = TodoApi.getTodos()

		expect(actualTodos).toEqual(todos)
	})

	it('test #4: setTodos should set valid array todos', () => {
		let todos = [{
			id: 23,
			text: 'some text',
			completed: false
		}]
		TodoApi.setTodos(todos)
		let actualTodos = JSON.parse(localStorage.getItem('todos'))

		expect(actualTodos).toEqual(todos)
	})

	it('test #5: setTodos should NOT set invalid array todos', () => {
		let badTodos = {dummy: 'dummy'} 
		TodoApi.setTodos(badTodos)

		expect(localStorage.getItem('todos')).toBe(null)
	})

	describe('Nest #1: filterTodo method', () => {
		let todos = [{
			id: 1,
			text: 'some string text',
			completed: true,
			}, {
			id: 2,
			text: 'Other string text ',
			completed: false,
			}, {
			id: 3,
			text: 'some string text a third time',
			completed: true,
			}
		]

		it('Test #1: showCompleted will return all items if completed props is true', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos.length).toBe(3)
		})

		it('Test #2: showCompleted should return NOT all items if completed is false', () => {
			let filteredTodos = TodoApi.filterTodos(todos, false, '')

			expect(filteredTodos.length).toBe(1)
		})

		it('Test #3: showCompleted should sort by completed status', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos[0].completed).toBe(false)
		})

		it('Test #4: showCompleted should filter by text', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, 'some')

			expect(filteredTodos.length).toBe(2)
		})

		it('Test #5: showCompleted should return all items if search bar empty', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos.length).toBe(3)
		})

	})

})

/*--------------------------------------------------------------*/
/*Component Todo*/
describe('Component Todo', () => {

	it('Test #1: Component Todo should exist', () => {
		expect(Todo).toExist()
	})

	it('Test #2: it should call onToggle prop with OnClick', () => {
		let todoDummy = {
			id: 155,
			text: 'Some text here',
			completed: true
		}
		let spy = expect.createSpy()
		let todoComponent = TestUtils.renderIntoDocument(<Todo {...todoDummy} onToggle={spy} />)
		let $el = $(ReactDOM.findDOMNode(todoComponent))
		/*verify OnClick is getting passed from the first div 
		in the component*/
		TestUtils.Simulate.click($el[0])
		/*passing id onToggle using the spread to inject the props in the component*/
		expect(spy).toHaveBeenCalledWith(155)
	})

})

/*--------------------------------------------------------------*/
/*Component TodoList*/
describe('Component TodoList', () => {

	it('Test #1: Component TodoList should exist', () =>  {
		expect(TodoList).toExist()
	})

	it('Test #2: should render one Todo for each item in TodoList array', () => {
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

/*--------------------------------------------------------------*/
/*Component TodoApp*/
describe('Component TodoApp', () => {

	it('Test #1: Component TodoApp should exist', () =>  {
		expect(TodoApp).toExist()
	})

	it('Test #2: it should add item to todoState using hanldeAddTodo', () => {
		let todoText = 'Test text'
		let todoAppMock = TestUtils.renderIntoDocument(<TodoApp />)

		todoAppMock.setState({ todos: [] })
		todoAppMock.handlerAddTodo(todoText)

		expect(todoAppMock.state.todos[0].text).toBe(todoText)
	})

	it('Test #3: handleToggle method should toggle completed prop', () => {
		let todoDummy = {
			id: 15,
			text: 'Some text here',
			completed: false 
		}
		let todoApp = TestUtils.renderIntoDocument(<TodoApp />)
		todoApp.setState({todos: [todoDummy] })

		expect(todoApp.state.todos[0].completed).toBe(false)
		todoApp.handleToggle(todoDummy.id)		
		expect(todoApp.state.todos[0].completed).toBe(true)
	})

	it('Test# 4: handleToggle method should toggle completed', () => {
		let todoDummy = {
			id: 15,
			text: 'Some text here',
			completed: false,
			createdAt: 0,
			completedAt: undefined
		}
		let todoApp = TestUtils.renderIntoDocument(<TodoApp />)
		todoApp.setState({todos: [todoDummy] })

		expect(todoApp.state.todos[0].completed).toBe(false)
		todoApp.handleToggle(todoDummy.id)
		expect(todoApp.state.todos[0].completed).toBe(true)
		expect(todoApp.state.todos[0].completedAt).toBeA('number')
	})

	it('Test# 5: handleToggle method should toggle completed to incomplete', () => {
		let todoDummy = {
			id: 15,
			text: 'Some text here',
			completed: true,
			createdAt: 0,
			completedAt: 1233
		}
		let todoApp = TestUtils.renderIntoDocument(<TodoApp />)
		todoApp.setState({todos: [todoDummy] })

		expect(todoApp.state.todos[0].completed).toBe(true)
		todoApp.handleToggle(todoDummy.id)
		expect(todoApp.state.todos[0].completed).toBe(false)
		expect(todoApp.state.todos[0].completedAt).toNotExist()
	})

})

/*--------------------------------------------------------------*/
/*Component TodoAdd*/
describe('Component ToDo ', () => {

	it('Test #1: Component AddToDo should exist', () => {
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

/*--------------------------------------------------------------*/
/*Component TodoSearch*/
describe('Component TodoSearch exists', () => {
	
	it('test #1: verifies the component exists', () => {
		expect(TodoSearch).toBe(TodoSearch)
	})

	it('test #2: onSearch should get called with input text on search bar', () => {
		let spy = expect.createSpy()
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let searchText = 'Acid test'

		todoSearch.refs.searchText.value = searchText
		TestUtils.Simulate.change(todoSearch.refs.searchText)

		expect(spy).toHaveBeenCalledWith(false, 'Acid test')
	})

	it('test #3: should called onSearch with proper value ', () => {
		let spy = expect.createSpy()
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let showCompleted = false

		todoSearch.refs.showCompleted.checked = showCompleted
		TestUtils.Simulate.change(todoSearch.refs.showCompleted)

		expect(spy).toHaveBeenCalledWith(false, '')
	})

})	

/*--------------------------------------------------------------*/
/*Testing actions*/
describe('Actions Testing', () => {

	it('Test #1: should generate search text action', () => {
		let completedAction = {
			type: "SET_SEARCH_TEXT",
			searchText: 'some text'
		}
		let response = actions.setSearchText(completedAction.searchText)

		expect(response).toEqual(completedAction)
	})	

	it('Test #2: should generate add todo action', () => {
		let completedAction = {
			type: "ADD_TODO",
			text: 'Thing todo'
		}
		let response = actions.addTodo(completedAction.text)

		expect(response).toEqual(completedAction)
	})	

	it('Test #3: should generate toggle show completed action', () => {
		let completedAction = {
			type: "TOGGLE_SHOW_COMPLETED",
		}
		let response = actions.toggleShowCompleted(completedAction)

		expect(response).toEqual(completedAction)
	})	

	it('Test #4: should generate toggle todo action', () => {
		let completedAction = {
			type: "TOGGLE_TODO",
			id: '2'
		}
		let response = actions.toggleTodo(completedAction.id)

		expect(response).toEqual(completedAction)
	})	

})

/*--------------------------------------------------------------*/
/*Testing actions*/
describe('Reducers testing', () => {

	describe('searchText reducer testing', () => {

		it('Test #1: it should update searchText when action called', () => {
			let action = {
				type: "SET_SEARCH_TEXT",
				searchText: "Cat"
			}
			/*response is the state*/
			let response = reducers.searchTextReducer(df(''), df(action))
			/*Assert both states are equal*/
			expect(response).toEqual(action.searchText)
		})

	})

	describe('showCompletedReducer testing', () => {

		it('Test #1: it should update state when action called', () => {
			let action = {
				type: "TOGGLE_SHOW_COMPLETED",
			}
			/*response is the state*/
			let response = reducers.showCompletedReducer(df(false), df(action))
			/*Assert both states are equal*/
			expect(response).toEqual(true)
		})

	})

	describe('addTodoReducer Testing', () => {

		it('Test #1: it should add todo when action called', () => {
			let action = {
				type: "ADD_TODO",
				text: "I like cats"
			}
			let response = reducers.todosReducer( df([]), df(action) )
			
			expect(response.length).toEqual(1)
			expect(response[0].text).toEqual(action.text)
		})

		it('Test #2: it should toggle todo when action called', () => {
			let action =  {
				type: "TOGGLE_TODO",
				id: 1,
			}
			let todos = [{	
				id: 1,
				completed: true, 
				completedAt: 130, 
				text: "I like my cat", 
				createdAt: 125 
				}
			]
			let response = reducers.todosReducer( df(todos), df(action) )

			expect(response[0].completed).toEqual(false)
			expect(response[0].completedAt).toEqual(undefined)	
		})


	})

})