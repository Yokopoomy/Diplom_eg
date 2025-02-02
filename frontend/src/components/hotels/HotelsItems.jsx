import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelsItems({ item, index, limit }) {
  const navigate = useNavigate();

  if (index >= limit) {
    return null;
  }

  const pics = JSON.parse(item.files);
  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
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