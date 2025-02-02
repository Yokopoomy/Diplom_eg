import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export default function FindRooms() {
  const dispatch = useDispatch();

  // Функция для получения текущей даты в формате YYYY-MM-DD
  const getCurrentDate = useCallback(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Состояния для хранения данных формы
  const [hotelName, setHotelName] = useState("");
  const [dateStart, setDateStart] = useState(getCurrentDate());
  const [dateEnd, setDateEnd] = useState(getCurrentDate());

  // Функция для поиска номеров
  const findRooms = useCallback(async () => {
    const objDTO = {
      hotelName,
      dateStart,
      dateEnd,
    };
    console.log("objDTO", objDTO);

    try {
      const url = process.env.REACT_APP_BACK_URL + "/api/client/reservations";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      console.log("RES ", data);
    } catch (error) {
      console.error("Ошибка при поиске номеров:", error);
    }
  }, [hotelName, dateStart, dateEnd]);

  return (
    <div className="mainpage">
      <h1 className="mb20 clb">Поиск номеров</h1>

      {/* Поле для ввода названия гостиницы */}
      <div className="mb20">
        <input
          type="text"
          className="findrooms hotels"
          placeholder="Введите название гостиницы (не обязательно)"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
      </div>

      {/* Поля для выбора дат заезда и выезда */}
      <div className="findrooms dates">
        <div className="findrooms date">Заезд</div>
        <div className="findrooms date">Выезд</div>
      </div>
      <div className="findrooms dates mb20">
        <input
          type="date"
          className="findrooms date"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />
        --
        <input
          type="date"
          className="findrooms date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
      </div>

      {/* Кнопка для поиска номеров */}
      <button className="findrooms-btn blue" onClick={findRooms}>
        Искать
      </button>
    </div>
  );
}