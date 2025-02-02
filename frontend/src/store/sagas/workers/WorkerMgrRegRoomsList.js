import { put, retry } from "redux-saga/effects";
import {
  actMgrRegRoomsList,
  actionUserTest,
} from "../../actions/actionCreators";

import { mgrRegRoomsSearchList } from "../../api/regrooms/mgrRegroomsSearchList";

export default function* WorkerMgrRegRoomsList(action) {
  console.log("SAGA WORKER WorkerMgrRegRoomsList", action.payload);
  if (typeof action.payload !== "string") {
    console.log(
      "NONONO ============== Прерываем WORKER WorkerMgrRegRoomsList по строке",
    );
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      mgrRegRoomsSearchList,
      action.payload,
    );
    console.log("Worker WorkerMgrRegRoomsList 222", data);
    yield put(actMgrRegRoomsList(data));
  } catch (err) {
    yield put(actionUserTest(err.massage));
  }
}
