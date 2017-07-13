import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import $ from 'jquery'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import firebase, {firebaseRef, githubProvider} from '../../../firebase/index'


import connectedTodo, {Todo} from '../../components/Todo'
import TodoList from '../../components/TodoList'
import TodoApp from '../../components/TodoApp'
import {AddTodo} from '../../components/AddTodo'
import {TodoSearch} from '../../components/TodoSearch'
import TodoApi from '../../api/TodoApi'
import uuid from 'node-uuid'
import moment from 'moment'

/*Import all as actions so we can use the "alias" actions*/
import * as actions from '../../actions/actions'
import {setSearchText, addTodo, toggleShowCompleted, toggleTodo, startAddTodo}  from '../../actions/actions'

/*import reducers*/
import df from 'deep-freeze-strict'
import * as reducers from '../../reducers/reducers'
import {searchTextReducer,showCompletedReducer, todosReducer} from '../../reducers/reducers'

/*import store*/
import {configure} from '../../store/configureStore'

/*create mock store*/
const middlewares = [thunk] 
let createMockStore = configureStore(middlewares)

'use strict'
/*require all modules ending in "_test" from the
current directory and all subdirectories*/
let testsContext = require.context(".", true, /_test$/)
testsContext.keys().forEach(testsContext)

/*Begin tests*/
/*--------------------------------------------------------------*/
/*Main: app Component*/
describe('Main App' + '\n', () => {

	it('The App should be testable'+ '\n', () => {
		expect(1).toBe(1)
	})

})

/*Test todoAPI*/
/*--------------------------------------------------------------*/
describe('TodoApi component' + '\n', () => {

	beforeEach( () => {
		localStorage.removeItem('todos')
	})

	it('Test #1: Api should exists' + '\n', () => {
		expect(TodoApi).toExist()
	})

	describe('Nest #1: filterTodo method' + '\n', () => {
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

		it('Test #1: showCompleted will return all items if completed props is true' + '\n', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos.length).toBe(3)
		})

		it('Test #2: showCompleted should return NOT all items if completed is false' + '\n', () => {
			let filteredTodos = TodoApi.filterTodos(todos, false, '')

			expect(filteredTodos.length).toBe(1)
		})

		it('Test #3: showCompleted should sort by completed status' + '\n', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos[0].completed).toBe(false)
		})

		it('Test #4: showCompleted should filter by text' + '\n', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, 'some')

			expect(filteredTodos.length).toBe(2)
		})

		it('Test #5: showCompleted should return all items if search bar empty' + '\n', () => {
			let filteredTodos = TodoApi.filterTodos(todos, true, '')

			expect(filteredTodos.length).toBe(3)
		})

	})

})

/*--------------------------------------------------------------*/
/*Component Todo*/
describe('Component Todo' + '\n', () => {

	it('Test #1: Component Todo should exist' + '\n', () => {
		expect(Todo).toExist()
	})

	// it('Test #2: it should call onToggle prop with OnClick', () => {
	it('Test #2: (after redux) should dispatch TOGGLE_TODO action onClick' + '\n', () => {
		let todoDummy = {
			id: 155,
			text: 'Some text here',
			completed: true
		}

		let action = actions.startToggleTodo(todoDummy.id , !todoDummy.completed) 

		let spy = expect.createSpy()
		// let todoComponent = TestUtils.renderIntoDocument(<Todo {...todoDummy} onToggle={spy} />)
		let todoComponent = TestUtils.renderIntoDocument(<Todo {...todoDummy} dispatch={spy}/>)
		let $el = $(ReactDOM.findDOMNode(todoComponent))
		/*verify OnClick is getting passed from the first div 
		in the component*/
		TestUtils.Simulate.click($el[0])
		/*passing id onToggle using the spread to inject the props in the component*/
		expect(spy).toHaveBeenCalledWith(action)
		// expect(spy).toHaveBeenCalledWith({
		// 	type: 'TOGGLE_TODO',
		// 	id: todoDummy.id
		// })
	})

})

/*--------------------------------------------------------------*/
/*Component TodoList*/
describe('Component TodoList' + '\n', () => {

	it('Test #1: Component TodoList should exist' + '\n', () =>  {
		expect(TodoList).toExist()
	})
	
	it('Test#2: (after redux) should render one Todo for each item in array' + '\n', () => {
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
describe('Component TodoApp' + '\n', () => {

	it('Test #1: Component TodoApp should exist' + '\n', () =>  {
		expect(TodoApp).toExist()
	})

	it('Test #1: (after redux) should render TodoList' + '\n', () => {
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
/*Component AddTodo*/
describe('Component ToDo ' + '\n', () => {

	it('Test #1: Component AddToDo should exist' + '\n', () => {
		expect(AddTodo).toExist()
	})

	it('Test #2: (after redux) should dispatch ADD_TODO  when valid text' + '\n', () => {
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
	it('Test #3: (after redux) should not dispatch ADD_TODO when valid text' + '\n', () => {
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
describe('Component TodoSearch exists' + '\n', () => {
	
	it('test #1: verifies the component exists' + '\n', () => {
		expect(TodoSearch).toBe(TodoSearch)
	})

	// it('test #2: onSearch should get called with input text on search bar', () => {
	it('test #2: (after redux) should dispatch "SET_SEARCH_TEXT" on input change' + '\n', () => {
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
	it('test #3: (after redux) it should dispatch "TOGGLE_SHOW_COMPLETED" on checkbox checked ' + '\n', () => {
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
describe('Actions Testing' + '\n', () => {

	it('Test #1: should generate search text action' + '\n', () => {
		let completedAction = {
			type: "SET_SEARCH_TEXT",
			searchText: 'some text'
		}
		let response = actions.setSearchText(completedAction.searchText)

		expect(response).toEqual(completedAction)
	})	

	it('Test #2: should generate add todo action' + '\n', () => {
		let completedAction = {
			type: "ADD_TODO",
			// text: 'Thing todo' -> before firebase
			todo: {
				id: '123',
				text: 'Some text',
				completed: false,
				createdAt: 0
			}
		}
		// let response = actions.addTodo(completedAction.text)
		let response = actions.addTodo(completedAction.todo)

		expect(response).toEqual(completedAction)
	})	

	it('Test #3: should generate toggle show completed action' + '\n', () => {
		let completedAction = {
			type: "TOGGLE_SHOW_COMPLETED",
		}
		let response = actions.toggleShowCompleted(completedAction)

		expect(response).toEqual(completedAction)
	})	

	// it('Test #4: should generate toggle todo action' + '\n', () => {
		it('Test #4: should generate update todo action' + '\n', () => {
			let completedAction = {
				type: "UPDATE_TODO",
				id: '1223',
				updates: {completed: false}
			}
			// let response = actions.toggleTodo(completedAction.id)
			let response = actions.updateTodo(completedAction.id, completedAction.updates)

			expect(response).toEqual(completedAction)
		})	


	it('Test #6: it should generate login action object' + '\n', () => {
		let uid = '123'
		let completedAction = {
			type: "LOGIN",
			uid
		}
		let response =  actions.login(completedAction.uid)
		expect(response).toEqual(completedAction)
	})	

	it('Test #7: it should generate logout action object' + '\n', () => {
		let completedAction = {
			type: "LOGOUT",
		}
		let response =  actions.logout(completedAction)
		expect(response).toEqual(completedAction)
	})

	it('Test #6: it should generate Todos action object' + '\n', () => {
		let todos = [{
			id: '111',
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
	
	describe('Firebase action todos test' + '\n', () => {
		let testTodoRef
		let uid
		let todosRef
		// let token = process.env.GITHUB_ACCESS_TOKEN

		beforeEach( (done) => {
			// let credential = firebase.auth.GithubAuthProvider.credential(token)

			
			// Using a redirect.
			firebase.auth().getRedirectResult().then(function(result) {
			    console.dir(result)
			  if (result.credential) {
			    // This gives you a GitHub Access Token.
			    var token = result.credential.accessToken;
			  }
			  var user = result.user;
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  if (errorCode === 'auth/account-exists-with-different-credential') {
			    alert('You have signed up with a different provider for that email.');
			    // Handle linking here if your app allows it.
			  } else {
			    console.error(error);
			  }
			});

			// Start a sign in process for an unauthenticated user.
			var provider = new firebase.auth.GithubAuthProvider();
			firebase.auth().signInWithRedirect(provider);
			provider.addScope('repo');


			// firebase.auth().signInWithCredential(provider)
			// .then( (user) => {
			// 	uid = user.uid
			// 	todosRef = firebaseRef.child(`users/${uid}/todos`)
			// 	return todosRef.remove()
			// 	}).then( () => {
			// 		testTodoRef = todosRef.push()
			// 		return testTodoRef.set({
			// 			text: 'Some text',
			// 			completed: false,
			// 			createdAt: 123654,
			// 		})
			// 	}).then( () => done()  ).catch(done)
				
		})

		afterEach((done) => {
			todosRef.remove().then( () => done() )
		})

		it('Test #1: Should toggle todo and dispatch UPDATE_TODO action ' + '\n' , (done) => {
			const store = createMockStore({auth:{uid}})
			const action = actions.startToggleTodo(testTodoRef.key, true)

			store.dispatch(action).then(() => {
				const mockActions = store.getActions()
				expect(mockActions[0]).toInclude({
					type: "UPDATE_TODO",
					id: testTodoRef.key,
				})
				expect(mockActions[0].updates).toInclude({
					completed: true
				})
				expect(mockActions[0].updates.completedAt).toExist()
				done()
			}, done)
		})
		
		it('Test #2: should create todo and dispatch ADD_TODO', (done) => {
			const store = createMockStore({auth:{uid}})
			const todoText = 'Something here' 

			store.dispatch(actions.startAddTodo(todoText))
				.then(() => {
					const actions = store.getActions()
					expect(actions[0]).toInclude({
						type: 'ADD_TODO'
					})
					expect(actions[0]).toInclude({
						text: todoText
					})
					done()
			}).catch(done)
		})

		it('Test #3: Should populate todos and dispatch ADD_TODOS action ' + '\n' , (done) => {
			const store = createMockStore({auth:{uid}})
			const action = actions.startAddTodos()

			store.dispatch(action).then(() => {
				const mockActions = store.getActions()
				expect(mockActions[0].type).toEqual("ADD_TODOS")
				expect(mockActions[0].todos.length).toEqual(1)
				expect(mockActions[0].todos[0].text).toEqual('Some text')
				done()
			}, done)
		})

	})

})

/*--------------------------------------------------------------*/
/*Testing reducers*/
describe('Reducers testing' + '\n', () => {

	describe('searchText reducer testing' + '\n', () => {

		it('Test #1: it should update searchText when action called' + '\n', () => {
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

	describe('showCompletedReducer testing' + '\n', () => {

		it('Test #1: it should update state when action called' + '\n', () => {
			let action = {
				type: "TOGGLE_SHOW_COMPLETED",
			}
			/*response is the state*/
			let response = reducers.showCompletedReducer(df(false), df(action))
			/*Assert both states are equal*/
			expect(response).toEqual(true)
		})

	})

	describe('addTodoReducer testing' + '\n', () => {

		it('Test #1: it should add todo when action called' + '\n', () => {
			let action = {
				type: "ADD_TODO",
				// text: "I like cats" -> before fb
				todo: {
					id: '123',
					text: 'Some text to do with it',
					completed: false,
					createdAt: 123
				}
			}
			let response = reducers.todosReducer( df([]), df(action) )
			
			expect(response.length).toEqual(1)
			// expect(response[0].text).toEqual(action.text)
			
			/*Since reducer is piping a todo an not a text*/
			expect(response[0]).toEqual(action.todo)
		})

		// it('Test #2: it should toggle todo when action called' + '\n', () => {
			it('Test #2: it should update todo when action called' + '\n', () => {
				let todos = [ 
					{				
						id: '123',
						text: "I like my cat",
						completed: true,
						completedAt: 130,
						createdAt: 125
					}
				]
				let updates = {
					completed: false,
					completedAt: null
				}
				let action =  {
					type: "UPDATE_TODO",
					id: todos[0].id,
					updates
				}
				// let response = reducers.addTodoReducer( df(todos), df(action) )
				let response = reducers.todosReducer( df(todos), df(action) )

				expect(response[0].completed).toEqual(updates.completed)
				expect(response[0].completedAt).toEqual(updates.completedAt)
				expect(response[0].text).toEqual(todos[0].text)
			})
			
		it('Test #3: it should add existing todos' + '\n', () => {
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

		it('Test #4: it should remove existing todos when logout is called' + '\n', () => {
			let todos = [{
				id: 111,
				text: 'anything',
				completed: false,
				completedAt: undefined,
				createdAt: 15000,
			}]
			let action = {
				type: "LOGOUT",
			}

			let response = reducers.todosReducer( df([]), df(action) )

			expect(response.length).toEqual(0)
			expect(response[0]).toNotExist()
		})

	})

	describe('authReducer testing' + '\n', () => {

		it('Test #4: it should login using uid' + '\n', () => {
			let action = {
				type: "LOGIN",
				uid: '111'
			}
			let response = reducers.authReducer( undefined, df(action) )

			expect(response).toEqual({
				uid: action.uid 
			})
		})

		it('Test #5: it should logout not using uid when action' + '\n' , () => {
			let toDelete = '111'
			let action = {
				type: "LOGOUT",
			}
			let response = reducers.authReducer( df(toDelete), df(action) )

			expect(response).toEqual({})
		})
		
	})

})