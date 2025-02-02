import {
  HOTELS_LIST,
  HOTELS_DELETE,
  HOTELS_PICS,
  HOTELS_ADD,
} from "../actions/actionTypes";

const initialState = {
  hotels: [],
  loading: false,
  error: null,
  hotelsPics: [],
};

export default function reducerHotelsList(state = initialState, action) {
  switch (action.type) {
    case HOTELS_LIST:
      return {
        ...state,
        hotels: action.payload,
        loading: false,
        error: null,
      };
    case HOTELS_ADD:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case HOTELS_DELETE:
      const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
      return {
        ...state,
        hotels: tempHOTELS,
        loading: false,
        error: null,
      };
    case HOTELS_PICS:
      console.log("HOTES-PICS reduser action.payload", action.payload);
      return {
        ...state,
        hotelsPics: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
