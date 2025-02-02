import { put, retry } from "redux-saga/effects";
import { actRegRoomsAdd, actionUserTest } from "../../actions/actionCreators";
import { regRoomsAdd } from "../../api/regrooms/regroomsAdd";

export default function* WorkerRegRoomsAdd(action) {
  console.log("WORKER REG-ROOMS-ADD", action);
  if (!action.payload) {
    console.log("DDDDDDDDDDDD1", "yes");
    return;
  } else {
    console.log("DDDDDDDDDDDD2", "no");
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      regRoomsAdd,
      action.payload,
    );
    yield put(actRegRoomsAdd(data));
  } catch (err) {
    if (err.massage) {
      alert("Ошибка запроса REG-ROOMS-ADD");
      yield put(actionUserTest(err.massage));
    }
  }
}
