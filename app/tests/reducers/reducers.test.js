import expect from 'expect'
import * as reducers from '../../reducers/reducers'
import {searchTextReducer, showCompletedReducer} from '../../reducers/reducers'
import df from 'deep-freeze-strict'
import uuid from 'node-uuid'
import moment from 'moment'

describe('Reducers testing', () => {

	describe('searchText reducer testing', () => {
		it('Test #1: it should update searchText when action called', () => {
			let action = {
				type: "SET_SEARCH_TEXT",
				searchText: "Cat"
			}
			/*response is the state*/
			let response = reducers.searchTextReducer('', action)
			/*Assert both states are equal*/
			expect(response).toEqual(action.searchText)
		})		
	})

	describe('showCompletedReducer testing', () => {
		it('Test #1: it should update state when action called', () => {
			let action = {
				type: "TOOGLE_SHOW_COMPLETED",
				showCompleted: true,
			}
			/*response is the state*/
			let response = reducers.showCompletedReducer( df({showCompleted: false}), df(action) )
			/*Assert both states are equal*/
			expect(response.showCompleted).toEqual(action.showCompleted)
		})
	})

	describe('addTodoReducer Testing', () => {
		it('Test #1: it should add todo when action called', () => {
			let action = {
				type: "ADD_TODO",
				// text: "I like cats" before firebase
				todo: {
					id: '123',
					text: 'Some text to do with it',
					completed: false,
					createdAt: 123
				}
			}
			let response = reducers.addTodoReducer( df([]), df(action) )
			
			expect(response.length).toEqual(1)
			expect(response[0]).toEqual(action.todo)
		})	

		it('Test #2: it should update todo when action called', () => {
			let action =  {
				type: "UPDATE_TODO",
				id: todos[0].id,
				updates
			}
			let todos = [ {				
					id: 123,
					completed: true,
					completedAt: 130,
					text: "I like my cat",
					createdAt: 125
				} ]
			let updates = {
				completed: false,
				completedAt: null
			}
			// let response = reducers.addTodoReducer( df(todo), df(action) )
			let response = reducers.todoReducer( df(todo), df(action) )

			expect(response[0].completed).toEqual(updates.completed)
			expect(response[0].completedAt).toEqual(updates.completedAt)
			expect(response[0].text).toEqual(todos[0].text)
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

			let response = reducers.todosReducer( df([]), df(action) )

			expect(response.length).toEqual(1)
			expect(response[0]).toEqual(todos[0])
		})		

		it('Test #4: it should remove existing todos when logout is called', () => {
			let todos = [{
				id: 111,
				text: 'anything',
				completed: false,
				completedAt: undefined,
				createdAt: 15000,
			}]
			let completedAction = {
				type: "LOGOUT",
			}

			let response = reducers.todosReducer( df([]), df(action) )

			expect(response.length).toEqual(0)
			expect(response[0]).toNotExist()
		})

	})

	describe('Testing auth reducers' + '\n', () => {

		it('Test #4: it should login using uid', () => {
			let action = {
				type: "LOGIN",
				uid: '111'
			}
			let response = reducers.authReducer( df({}), df(action) )

			expect(response.uid).toEqual(action.uid)
		})

		it('Test #5: it should logout not using uid when action', () => {
			let action = {
				type: "LOGOUT",
			}
			let response = reducers.authReducer( df({}), df(action) )

			expect(response.uid).toNotExist()
		})
		
	})

})