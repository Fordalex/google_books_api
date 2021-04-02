const initialState = {
  profile: {
    user: null,
    books: null,
  },
  book: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_PROFILE":
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: {
          user: null,
          books: null,
        },
        repos: [],
        loading: false,
      };
    case "BOOK_ID":
      return {
        ...state,
        book: payload,
      }
    default:
      return state;
  }
}
