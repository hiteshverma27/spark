function userReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      localStorage.setItem("name", state.userName);
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_CITY":
      return {
        ...state,
        userCity: action.payload,
      };
    case "SET_LATITUDE":
      localStorage.setItem("lat", action.payload);
      return {
        ...state,
        latitude: action.payload,
      };
    case "SET_LONGITUDE":
      localStorage.setItem("lon", action.payload);
      return {
        ...state,
        longitude: action.payload,
      };
    case "SET_TEMP":
      return {
        ...state,
        temp: action.payload,
      };
    case "SET_QUOTE":
      return {
        ...state,
        quote: action.payload,
      };
    default:
      return { ...state };
  }
}

export { userReducer };
