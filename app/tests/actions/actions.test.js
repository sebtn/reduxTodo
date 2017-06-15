import expect from 'expect'
import {setSearchText} from '../../actions/actions'

import * as actions from '../../actions/actions'

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
			id: 2
		}
		let response = actions.toggleTodo(completedAction.id)

		expect(response).toEqual(completedAction)
	})	

})