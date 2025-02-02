import { put, retry } from "redux-saga/effects";
import { actUsersUpdate, actionUserTest } from "../../actions/actionCreators";
import { usersUpdate } from "../../api/users/usersUpdate";

export default function* WorkerUsersUpdate(action) {
  if (action.payload.email) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      usersUpdate,
      action.payload,
    );
    yield put(actUsersUpdate(data));
  } catch (err) {
    alert("Ошибка UPDATE USERS");
    yield put(actionUserTest(err.massage));
  }
}
