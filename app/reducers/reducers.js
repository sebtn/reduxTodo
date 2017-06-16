export let searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case "SET_SEARCH_TEXT":
			return action.searchText
		default: 
			return state			
	}
}

export let showCompletedReducer = (state = {showCompleted: false}, action) => {
	switch (action.type) {
		case "TOOGLE_SHOW_COMPLETED":
			return {
				showCompleted: true,
			}
		default: 
			return state			
	}
}				