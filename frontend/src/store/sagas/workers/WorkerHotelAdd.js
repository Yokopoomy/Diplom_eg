import { put, retry } from "redux-saga/effects";
import { actHotelsAdd, actionUserTest } from "../../actions/actionCreators";
import { hotelsAdd } from "../../api/hotels/hotelsAdd";

export default function* WorkerHotelsAdd(action) {
  console.log("WORKER HOTELS-ADD", action);
  if (!action.payload) {
    return;
  }
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(retryCount, retryDelay, hotelsAdd, action.payload);
    yield put(actHotelsAdd(data));
  } catch (err) {
    console.log("Ошибка запроса hotels ADD", err);
    if (err.massage) {
      alert("Ошибка запроса HOTELS-ADD");
      yield put(actionUserTest(err.massage));
    }
  }
}
