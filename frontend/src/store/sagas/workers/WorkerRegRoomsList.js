import { put, retry } from "redux-saga/effects";
import { actRegRoomsList, actionUserTest } from "../../actions/actionCreators";
import { regRoomsSearchList } from "../../api/regrooms/regroomsSearchList";

export default function* WorkerRegRoomsList(action) {
  if (typeof action.payload !== "string") {
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      regRoomsSearchList,
      action.payload,
    );
    yield put(actRegRoomsList(data));
  } catch (err) {
    yield put(actionUserTest(err.massage));
  }
}
