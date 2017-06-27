import expect from 'expect'
import TodoApi from '../api/TodoApi'

describe('TodoApi component', () => {
	it('Test #1: TodoApi should exists', () => {
		expect(TodoApi).toExist()
	})

})

describe('Filter todo method', () => {
	let todos = [{
		id: 1,
		text: 'some string text',
		completed: true,
		}, {
		id: 2,
		text: 'Other string text another time',
		completed: false,
		}, {
		id: 3,
		text: 'some string text a third time',
		completed: true,
		}
	]

	it('Test #1: showCompleted should return all items where completed is true', () => {
		let filteredTodos = TodoApi.filterTodos(todos, true, '')

		expect(filteredTodos.length).toBe(3)
	})

	it('Test #2: showCompleted should return all items where completed is true', () => {
		let filteredTodos = TodoApi.filterTodos(todos, false, '')

		expect(filteredTodos.length).toBe(2)
	})

	it('Test #3: showCompleted should sort by completed status', () => {
		let filteredTodos = TodoApi.filterTodos(todos, true, '')

		expect(filteredTodos[0].complete).toBe(false)
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