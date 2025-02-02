import { put, retry } from "redux-saga/effects";
import { actHotelsDelete, actionUserTest } from "../../actions/actionCreators";
import { hotelsDelete } from "../../api/hotels/hotelsDelete";

export default function* WorkerHotelsDelete(action) {
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      hotelsDelete,
      action.payload,
    );
    yield put(actHotelsDelete(data._id));
  } catch (err) {
    console.log("Ошибка запроса hotels DELETE", err);
    if (err.massage) {
      alert("Ошибка запроса DELETE");
      yield put(actionUserTest(err.massage));
    }
  }
}
