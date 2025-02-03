import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoomsItems({ item, hotelState }) {
  const { user } = useSelector((state) => state.crUser);
  const navigate = useNavigate();

  // Проверяем, есть ли данные в поле images
  const pics = item.images ? JSON.parse(item.images) : [];
  const defaultPicUrl = "/public/rooms/Room.png";
  const picsUrl = pics.length > 0 
    ? `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})` 
    : `url(${process.env.REACT_APP_BACK_URL}${defaultPicUrl})`;

  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: "#ccc",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const fnViewRoom = () => {
    navigate(`/rooms/view/${item._id}`, { state: { item, hotelState } });
  };

  const fnEditRoom = () => {
    navigate(`/rooms/edit/${item._id}`, { state: { item, hotelState } });
  };

  return (
    <div className="hotels-item-wrap">
      <div className="hotels-item-pic" style={picStyle}></div>
      <div className="hotels-item-conteiner">
        <h2>{item.title}</h2>
        <div className="hotels-item-description">{item.description}</div>
        <div style={{ display: "flex" }}>
          {user && user.role === "admin" && (
            <button
              className="addhotel-btn red"
              onClick={fnEditRoom}
              style={{ marginRight: "20px" }}
            >
              Редактировать
            </button>
          )}
          <button className="addhotel-btn blue" onClick={fnViewRoom}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}