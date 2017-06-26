import expect from 'expect'
/*Import all as actions so we can use the "alias" actions*/
import * as actions from './../actions/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {setSearchText, 
	addTodo, 
	toggleShowCompleted, 
	toggleTodo}  from '../../actions/actions'

let createMockStore = configureMockStore([thunk]) 

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
			todo: {
				id: '123',
				text: 'Some text',
				completed: false,
				createdAt: 0
			}
		}
		let response = actions.addTodo(completedAction.todo)

		expect(response).toEqual(completedAction)
	})	

	it('Test #3: should generate toggle show completed action', () => {
		let completedAction = {
			type: "TOGGLE_SHOW_COMPLETED",
		}
		let response = actions.toggleShowCompleted(completedAction)

		expect(response).toEqual(completedAction)
	})	

	// it('Test #4: should generate toggle todo action', () => {
	it('Test #4: should generate update todo action', () => {
			let completedAction = {
				type: "UPDATE_TODO",
				id: '1223',
				updates: {completed: false}
			}
			// let response = actions.toggleTodo(completedAction.id)
			let response = actions.updateTodo(completedAction.id, completedAction.updates)

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
		let response =  actions.addTodos(completedAction)
		expect(response).toEqual(completedAction)
	})

	it('Test #6: should create todo and dispatch ADD_TODO', (done) => {
		const store = createMockStore({})
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

})