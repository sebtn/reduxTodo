import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'
import {Provider} from 'react-redux'

/*Import components commented out are before redux*/
// import Todo from '../../components/Todo'
import connectedTodo, {Todo} from '../../components/Todo'
import TodoList from '../../components/TodoList'
// import connectedTodoList, {TodoList} from '../../components/TodoList'
import TodoApp from '../../components/TodoApp'
// import AddTodo from '../../components/AddTodo'
import {AddTodo} from '../../components/AddTodo'
import {TodoSearch} from '../../components/TodoSearch'
// import TodoSearch from '../../components/TodoSearch'
import TodoApi from '../../api/TodoApi'
import uuid from 'node-uuid'
import moment from 'moment'

/*Import all as actions so we can use the "alias" actions*/
import * as actions from '../../actions/actions'
import {setSearchText, addTodo, toggleShowCompleted, toggleTodo}  from '../../actions/actions'

/*import reducers*/
import df from 'deep-freeze-strict'
import * as reducers from '../../reducers/reducers'
import {searchTextReducer,showCompletedReducer, todosReducer} from '../../reducers/reducers'

/*import store*/
let configureStore = require('../../store/configureStore')
import {configure} from '../../store/configureStore'

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

	// it('Test #2: it should call onToggle prop with OnClick', () => {
	it('Test #2: (after redux) should dispatch TOGGLE_TODO action onClick', () => {
		let todoDummy = {
			id: 155,
			text: 'Some text here',
			completed: true
		}
		let spy = expect.createSpy()
		// let todoComponent = TestUtils.renderIntoDocument(<Todo {...todoDummy} onToggle={spy} />)
		let todoComponent = TestUtils.renderIntoDocument(<Todo {...todoDummy} dispatch={spy}/>)
		let $el = $(ReactDOM.findDOMNode(todoComponent))
		/*verify OnClick is getting passed from the first div 
		in the component*/
		TestUtils.Simulate.click($el[0])
		/*passing id onToggle using the spread to inject the props in the component*/
		// expect(spy).toHaveBeenCalledWith(155)
		expect(spy).toHaveBeenCalledWith({
			type: 'TOGGLE_TODO',
			id: todoDummy.id
		})
	})

})

/*--------------------------------------------------------------*/
/*Component TodoList*/
describe('Component TodoList', () => {

	it('Test #1: Component TodoList should exist', () =>  {
		expect(TodoList).toExist()
	})
	
		it('Test#2: (after redux) should render one Todo for each item in array', () => {
			let todos = [{
					id:1, 
					text:'Some text for item 1', 
					completed: false, 
					completedAt: undefined, 
					createdAt: 500 
				}, {
					id:2, 
					text:'some text for item 2', 
					completed: false, 
					completedAt: undefined, 
					createdAt: 500 
				}
			]

			let store = configure({todos: todos})
			let provider = TestUtils.renderIntoDocument(
				<Provider store={store}>
					<TodoList />
				</Provider>
			)
			let todoList = TestUtils.scryRenderedComponentsWithType(provider, TodoList)[0]
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

	it('Test #1: (after redux) should render TodoList', () => {
		let store = configure()
		let provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<TodoApp />
			</Provider>
		)
		let todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0]
		let todoList =  TestUtils.scryRenderedComponentsWithType(todoApp, TodoList)

		expect(todoList.length).toEqual(1)
	})

})

/*--------------------------------------------------------------*/
/*Component TodoAdd*/
describe('Component ToDo ', () => {

	it('Test #1: Component AddToDo should exist', () => {
		expect(AddTodo).toExist()
	})

	it('Test #2: (after redux) should dispatch ADD_TODO  when valid text', () => {
		let searchText = 'Defined string'
			var action = {
				type: 'ADD_TODO',
				text: searchText
			}
			let spy = expect.createSpy()
			let textInForm = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />)
			let $el = $(ReactDOM.findDOMNode(textInForm))

			textInForm.refs.todoPassed.value = searchText
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

/*--------------------------------------------------------------*/
/*Component TodoSearch*/
describe('Component TodoSearch exists', () => {
	
	it('test #1: verifies the component exists', () => {
		expect(TodoSearch).toBe(TodoSearch)
	})

	// it('test #2: onSearch should get called with input text on search bar', () => {
	it('test #2: (after redux) should dispatch "SET_SEARCH_TEXT" on input change', () => {
		let searchText = 'Acid test'
		let action = {
			type: "SET_SEARCH_TEXT",
			searchText: searchText
		}
		let spy = expect.createSpy()
		// let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
		let todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)

		todoSearch.refs.searchText.value = searchText
		TestUtils.Simulate.change(todoSearch.refs.searchText)

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
		TestUtils.Simulate.change(todoSearch.refs.showCompleted)

		// expect(spy).toHaveBeenCalledWith(false, '')
		expect(spy).toHaveBeenCalledWith(action)
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

	it('Test #5: it should generate Todos action object', () => {
		let todos = [{
			id: 111,
			text: 'anything',
			completed: false,
			completedAt: undefined,
			createdAt: 15000,
		}]
		let completedAction = {
			type: "ADD_TODOS",
			todos
		}
		let response =  actions.addTodos(todos)
		expect(response).toEqual(completedAction)
	})

})

/*--------------------------------------------------------------*/
/*Testing reducers*/
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

		it('Test #3: it should add existing todos', () => {
			let todos = [{
				id: 111,
				text: 'anything',
				completed: false,
				completedAt: undefined,
				createdAt: 15000,
			}]
			let completedAction = {
				type: "ADD_TODOS",
				todos
			}

			let response = reducers.todosReducer( df([]), df(completedAction) )

			expect(response.length).toEqual(1)
			expect(response[0]).toEqual(todos[0])
		})

	})

})