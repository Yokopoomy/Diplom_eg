import { put, retry } from "redux-saga/effects";
import {
  actUserError,
  actUserSignup,
  actionUserTest,
} from "../../actions/actionCreators";
import { userSignup } from "../../api/users/userSignup";

export default function* WorkerUserSignup(action) {
  if (!action.payload.email) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      userSignup,
      action.payload,
    );
    yield put(actUserSignup(data));
  } catch (err) {
    yield put(actUserError(err));
  }
}
