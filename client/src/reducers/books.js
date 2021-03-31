const initialState = {
    books: null,
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
        default:
            return state
    }
}