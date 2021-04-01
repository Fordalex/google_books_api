const initialState = {
  profile: {
    user: null,
    reading: null,
    read: null
  },
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
          reading: null,
          read: null
        },
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
