import { put, retry } from "redux-saga/effects";
import {
  actUsersDelete,
  actUsersList,
  actionUserTest,
} from "../../actions/actionCreators";
import { usersDelete } from "../../api/users/usersDelete";

export default function* WorkerUsersDelete(action) {
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      usersDelete,
      action.payload,
    );
    yield put(actUsersDelete(data._id));
  } catch (err) {
    if (err.massage) {
      alert("Ошибка запроса DELETE");
      yield put(actionUserTest(err.massage));
    }
  }
}
