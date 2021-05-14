const initialState = [];

function admin(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_ADMIN_DATA":
      return [...state, payload];
    case "REMOVE_ADMIN_DATA":
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }

}

export default admin;