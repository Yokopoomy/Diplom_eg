import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";

export default function Hotels() {
  const { hotels = [] } = useSelector((state) => state.hotelsList);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const fetchHotels = useCallback(() => {
    const params = {
      offset,
      limit,
      search,
    };
    dispatch(actHotelsList(params));
  }, [offset, limit, search, dispatch]);

  useEffect(() => {
    fetchHotels();
  }, [offset, limit, fetchHotels]);

  const handleLimitChange = useCallback((event) => {
    const numLimit = Number(event.target.value);
    setOffset(0); // Сброс offset при изменении limit
    setLimit(numLimit);
  }, []);

  const handleOffsetChange = useCallback((type) => {
    setOffset((prevOffset) =>
      type === "incr" ? prevOffset + 1 : Math.max(prevOffset - 1, 0)
    );
  }, []);

  return (
    <div className="hotels-main">
      <div className="hotels-header">
        <div className="hotels-flex">
          <h1 className="hotels-flex-h1">Поиск гостиницы</h1>
          <div className="hotels-flex-div">
            <span className="span-limit">Показывать по</span>
            <select value={limit} onChange={handleLimitChange}>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        <div className="hotels-filter">
          <input
            type="text"
            className="findrooms hotels"
            placeholder="введите слова для поиска"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="hotels-item-btn" onClick={fetchHotels}>
            Найти
          </button>
        </div>
      </div>

      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelsItems key={hotel._id} item={hotel} limit={limit} />
        ))
      ) : (
        <p>Нет доступных отелей.</p>
      )}

      <div className="paging">
        <button
          className="paging-button"
          onClick={() => handleOffsetChange("decr")}
          disabled={offset < 1}
        >
          <span className="paging-arrows">&lt;</span>
        </button>
        <span className="paging-span">{offset + 1}</span>
        <button
          className="paging-button"
          onClick={() => handleOffsetChange("incr")}
          disabled={hotels.length < limit}
        >
          <span className="paging-arrows">&gt;</span>
        </button>
      </div>
    </div>
  );
}