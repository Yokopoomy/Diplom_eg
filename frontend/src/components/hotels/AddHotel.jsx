import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageHandler from "./ImageHandler";
import { actUserError, actHotelsAdd, actHotelsPics } from "../../store/actions/actionCreators";


export default function AddHotel() {
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const saveButton = useRef(null);

  const validate = () => {
    return title.length >= 5 && description.length >= 100 && hotelsPics.length >= 1;
  };

  useEffect(() => {
    setSaveBtnDisabled(!validate());
  }, [hotelsPics, title, description]);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    hotelsPics.forEach((item) => formData.append("files", item));
    formData.append("title", title);
    formData.append("description", description);
    dispatch(actHotelsAdd(formData));
    clearAll();
  };

  const clearAll = () => {
    dispatch(actHotelsPics([]));
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mainpage">
      <ImageHandler
        pics={hotelsPics}
        setPics={actHotelsPics}
        maxPics={10}
        maxSizeMB={10}
        minWidth={1000}
        maxSumSides={5000}
        errorAction={actUserError}
      />
      <div>
        <span className="addhotel-span">Название отеля</span>
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
          <span className="addhotel-span">Описание отеля</span>
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