import {
  combineReducers,
  applyMiddleware,
  compose,
  legacy_createStore,
} from "redux";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";
import reducerUser from "./reducers/user";
import reducerUsersList from "./reducers/users";
import reducerHotelsList from "./reducers/hotels";
import reducerRooms from "./reducers/rooms";
import reducerRegRooms from "./reducers/regrooms";

const reducer = combineReducers({
  crUser: reducerUser,
  usersList: reducerUsersList,
  hotelsList: reducerHotelsList,
  rooms: reducerRooms,
  regrooms: reducerRegRooms,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

export default store;
