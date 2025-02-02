import { put, retry } from "redux-saga/effects";
import { actHotelsList, actionUserTest } from "../../actions/actionCreators";
import { hotelsListSearch } from "../../api/hotels/hotelsListSearch";

export default function* WorkerHotelsList(action) {
  if (!action.payload.limit) {
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      hotelsListSearch,
      action.payload,
    );
    yield put(actHotelsList(data));
  } catch (err) {
    alert("Ошибка запроса hotelsList");
    yield put(actionUserTest(err.massage));
  }
}
