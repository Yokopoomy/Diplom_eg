import { put, retry } from "redux-saga/effects";
import { userLoginSearch } from "../../api/users/userLoginSearch";
import {
  actUserError,
  actUserLogin,
  actionUserTest,
} from "../../actions/actionCreators";

export default function* WorkerUserLoginSearch(action) {
  if (!action.payload.email) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      userLoginSearch,
      action.payload,
    );
    yield put(actUserLogin(data));
  } catch (err) {
    yield put(actUserError(err));
  }
}
