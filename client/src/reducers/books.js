const initialState = {
    books: null,
    bookIndex: 0,
    loading: false,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "SEARCHING_BOOKS":
            return {
                loading: true,
            }
        case "SEARCHED_BOOKS":
            return {
                books: payload,
                loading: false,
            }
        case "BOOK_INDEX":
            return {
                ...state,
                bookIndex: payload,
            }
        default:
            return state
    }
}