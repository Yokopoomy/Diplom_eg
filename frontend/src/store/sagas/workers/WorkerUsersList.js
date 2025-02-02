import { put, retry } from "redux-saga/effects";
import { actUsersList, actionUserTest } from "../../actions/actionCreators";
import { usersListSearch } from "../../api/users/usersListSearch";

export default function* WorkerUsersList(action) {
  if (!action.payload.limit) {
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      usersListSearch,
      action.payload,
    );
    yield put(actUsersList(data));
  } catch (err) {
    alert("Ошибка запроса");
    yield put(actionUserTest(err.massage));
  }
}
