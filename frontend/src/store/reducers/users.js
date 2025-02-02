import { USERS_LIST, USERS_DELETE, USERS_UPDATE } from "../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  isDelete: null,
};

export default function reducerUsersList(state = initialState, action) {
  switch (action.type) {
    case USERS_LIST:
      if (action.payload.limit) {
        return state;
      }
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
        isDelete: null,
      };
    case USERS_DELETE:
      return {
        ...state,
        loading: false,
        error: null,
        isDelete: action.payload,
      };
    case USERS_UPDATE:
      return {
        ...state,
        loading: false,
        error: null,
        isDelete: action.payload.id,
      };

    default:
      return state;
  }
}
