import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddHotelPics from "./AddHotelPics";
import AddRoomPics from "./AddRoomPics";
import { actHotelsPics, actRoomsPics } from "../../store/actions/actionCreators";

export default function EditEntity({ entityType, fetchEntity, updateEntity, picsSelector, picsAction }) {
  const { id } = useParams();
  const pics = useSelector(picsSelector);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const saveButton = useRef(null);
  const pictures = useMemo(() => (entityType === "hotel" ? <AddHotelPics /> : <AddRoomPics />), [entityType]);

  // Загрузка данных сущности
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEntity(id);
      setTitle(data.title);
      setDescription(data.description);

      const arrPicsFromBack = JSON.parse(entityType === "hotel" ? data.files : data.images);
      const arrTemp = [];
      const backendUrl = process.env.REACT_APP_BACK_URL;

      for (const i of arrPicsFromBack) {
        const response = await fetch(backendUrl + i.url);
        const blob = await response.blob();
        const file = new File([blob], i.name);
        arrTemp.push(file);
      }

      dispatch(picsAction(arrTemp));
    };

    fetchData();
  }, [id, fetchEntity, dispatch, picsAction, entityType]);

  // Валидация формы
  const validate = () => {
    return title.length >= 5 && description.length >= 100 && pics.length >= 1;
  };

  useEffect(() => {
    setSaveBtnDisabled(!validate());
  }, [pics, title, description]);

  // Обработчик сохранения
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    pics.forEach((item) => formData.append("files", item));
    formData.append("title", title);
    formData.append("description", description);
    await updateEntity(id, formData);
    clearAll();
  };

  // Очистка формы
  const clearAll = () => {
    dispatch(picsAction([]));
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mainpage">
      {pictures}
      <div>
        <span className="addhotel-span">Название {entityType === "hotel" ? "отеля" : "номера"}</span>
        <input
          className="addhotel-title"
          type="text"
          placeholder="не менее 5 символов"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>
          <span className="addhotel-span">Описание {entityType === "hotel" ? "отеля" : "номера"}</span>
          <textarea
            className="addhotel-desc"
            placeholder="не менее 100 символов"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
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