import {
  ROOMS_LIST,
  ROOMS_DELETE,
  ROOMS_PICS,
  ROOMS_ADD,
} from "../actions/actionTypes";

const initialState = {
  rooms: [],
  loading: false,
  error: null,
  roomsPics: [],
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case ROOMS_LIST:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
        error: null,
      };
    case ROOMS_ADD:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ROOMS_DELETE:
      const tempRooms = state.hotels.filter((i) => i._id !== action.payload);
      return {
        ...state,
        rooms: tempRooms,
        loading: false,
        error: null,
      };
    case ROOMS_PICS:
      return {
        ...state,
        roomsPics: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
