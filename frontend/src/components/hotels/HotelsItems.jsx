import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelsItems({ item, index, limit }) {
  const navigate = useNavigate();

  // Отображаем только те отели, которые соответствуют текущей странице
  if (index >= limit) {
    return null;
  }

  // Проверяем, есть ли данные в поле files
  const pics = item.files ? JSON.parse(item.files) : [];
  const defaultPicUrl = "/public/hotels/Hotel.png";
  const picsUrl = pics.length > 0 
    ? `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})` 
    : `url(${process.env.REACT_APP_BACK_URL}${defaultPicUrl})`;

  const picStyle = {
    backgroundImage: picsUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleViewHotel = useCallback(() => {
    navigate(`/hotels/view/${item._id}`, { state: { item } });
  }, [navigate, item]);

  return (
    <div className="hotels-item-wrap">
      <div className="hotels-item-pic" style={picStyle}></div>
      <div className="hotels-item-conteiner">
        <h2>{item.title}</h2>
        <div className="hotels-item-description">{item.description}</div>
        <button className="hotels-item-btn" onClick={handleViewHotel}>
          Подробнее
        </button>
      </div>
    </div>
  );
}