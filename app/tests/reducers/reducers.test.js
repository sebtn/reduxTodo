import expect from 'expect'
import * as reducers from '../../reducers/reducers'
import {searchTextReducer, showCompletedReducer} from '../../reducers/reducers'

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
			let response = reducers.showCompletedReducer({showCompleted: false}, action)
			/*Assert both states are equal*/
			expect(response.showCompleted).toEqual(action.showCompleted)
		})

	})

})