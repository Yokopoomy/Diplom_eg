import { put, retry } from "redux-saga/effects";
import { actRoomsDelete, actionUserTest } from "../../actions/actionCreators";
import { regRoomsDelete } from "../../api/regrooms/regroomsDelete";

export default function* WorkerRegRoomsDelete(action) {
  console.log("WORKER ROOMS-DELETE", action);
  if (!action.payload) {
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      regRoomsDelete,
      action.payload,
    );
    yield put(actRoomsDelete(data));
  } catch (err) {
    console.log("Ошибка запроса ROOMS ADD", err);
    if (err.massage) {
      alert("Ошибка запроса ROOMS-ADD");
      yield put(actionUserTest(err.massage));
    }
  }
}
