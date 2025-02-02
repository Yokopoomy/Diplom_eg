import { put, retry } from "redux-saga/effects";
import {
  actMgrRegRoomsDelete,
  actRoomsDelete,
  actionUserTest,
} from "../../actions/actionCreators";
import { regRoomsDelete } from "../../api/regrooms/regroomsDelete";
import { mgrRegRoomsDelete } from "../../api/regrooms/mgrRegroomsDelete";

export default function* WorkerMgrRegRoomsDelete(action) {
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
      mgrRegRoomsDelete,
      action.payload,
    );
    yield put(actMgrRegRoomsDelete(data));
  } catch (err) {
    console.log("Ошибка запроса ROOMS ADD", err);
    if (err.massage) {
      alert("Ошибка запроса ROOMS-ADD");
      yield put(actionUserTest(err.massage));
    }
  }
}
