const initialState = {
    books: null,
    bookIndex: 0,
    loading: false,
    filteredBooksCategory: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "SEARCHING_BOOKS":
            return {
                ...state,
                loading: true,
            }
        case "SEARCHED_BOOKS":
            return {
                ...state,
                books: payload,
                loading: false,
            }
        case "BOOK_INDEX":
            return {
                ...state,
                bookIndex: payload,
            }
        case "FILTERED_BOOK_BY_CATEGORY":
            return {
                ...state,
                filteredBooksCategory: payload,
            }
        default:
            return state
    }
}