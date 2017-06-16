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
				text: "I like cats"
			}
			let response = reducers.addTodoReducer( df([]), df(action) )
			
			expect(response.length).toEqual(1)
			expect(response[0].text).toEqual(action.text)
		})	
		it('Test #2: it should toggle todo when action called', () => {
			let action =  {
				type: "TOGGLE_TODO",
				id: 123,
			}
			let todo: [
				{				
					id: 123,
					completed: true,
					completedAt: 130,
					text: "I like my cat",
					createdAt: 125
				}
			]
			let response = reducers.addTodoReducer( df(todo), df(action) )

			expect(response[0].completed).toNotEqual(true)
			expect(response[0].completedAt).toEqual(undefined)
		})


	})

})