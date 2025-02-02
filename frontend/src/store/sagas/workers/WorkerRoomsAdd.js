import { put, retry } from "redux-saga/effects";
import { actRoomsAdd, actionUserTest } from "../../actions/actionCreators";
import { roomsAdd } from "../../api/hotels/roomsAdd";

export default function* WorkerRoomsAdd(action) {
  console.log("WORKER ROOMS-ADD", action);
  if (!action.payload) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(retryCount, retryDelay, roomsAdd, action.payload);
    yield put(actRoomsAdd(data));
  } catch (err) {
    console.log("Ошибка запроса ROOMS ADD", err);
    if (err.massage) {
      alert("Ошибка запроса ROOMS-ADD");
      yield put(actionUserTest(err.massage));
    }
  }
}
