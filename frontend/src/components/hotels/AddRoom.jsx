import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageHandler from "./ImageHandler";
import { actUserError, actRoomsAdd, actRoomsPics } from "../../store/actions/actionCreators";

export default function AddRoom({ setIsAddRoom, hotelId }) {
  const { roomsPics } = useSelector((state) => state.rooms);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const saveButton = useRef(null);

  // Валидация формы
  const validate = () => {
    return title.length >= 5 && description.length >= 100 && roomsPics.length >= 1;
  };

  // Эффект для обновления состояния кнопки "Сохранить"
  useEffect(() => {
    setSaveBtnDisabled(!validate());
  }, [roomsPics, title, description]);

  // Обработчик сохранения номера
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    roomsPics.forEach((item) => formData.append("files", item));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hotelId", hotelId);
    formData.append("isAnable", true);

    dispatch(actRoomsAdd(formData));
    clearAll();
  };

  // Очистка формы
  const clearAll = () => {
    dispatch(actRoomsPics([]));
    setTitle("");
    setDescription("");
    setIsAddRoom(false); // Закрываем форму добавления номера
  };

  return (
    <div className="mainpage">
      {/* Компонент для обработки изображений */}
      <ImageHandler
        pics={roomsPics}
        setPics={actRoomsPics}
        maxPics={10}
        maxSizeMB={10}
        minWidth={1000}
        maxSumSides={5000}
        errorAction={actUserError}
      />

      {/* Поле для названия номера */}
      <div>
        <span className="addhotel-span">Название номера</span>
        <input
          className="addhotel-title"
          type="text"
          placeholder="не менее 5 символов"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Поле для описания номера */}
      <div>
        <label>
          <span className="addhotel-span">Описание номера</span>
          <textarea
            className="addhotel-desc"
            placeholder="не менее 100 символов"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      {/* Кнопки "Сохранить" и "Отменить" */}
      <div className="addhotel-btn">
        <button
          ref={saveButton}
          className="addhotel-btn green"
          onClick={handleSave}
          disabled={saveBtnDisabled}
        >
          Сохранить
        </button>
        <button className="addhotel-btn red" onClick={clearAll}>
          Отменить
        </button>
      </div>
    </div>
  );
}