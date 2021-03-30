const initialState = {
    counter: 10,
}

export default function(state = initialState, action) {

    switch (action.type) {
        case "INCREMENT":
            return {counter: state.counter + 1}
        default:
            return state
    }
}