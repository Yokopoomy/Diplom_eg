import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ReservationsItems({ item, deleteItem }) {
  const { user } = useSelector((state) => state.crUser);
  const navigate = useNavigate();
  const pics = JSON.parse(item.roomId.images);

  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: "#ccc",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const dateStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 4px",
    marginBottom: "10px",
  };

  function fnViewRoom() {
    const url = `/rooms/view/${item._id}`;
    console.log("URL", url);
    navigate(url, { state: { item: item.roomId, hotelState: item.hotelId } });
  }

  return (
    <>
      <div>
        <div className="hotels-item-wrap">
          <div className="hotels-item-pic" style={picStyle}></div>
          <div className="hotels-item-conteiner">
            <h2 style={{ marginBottom: "10px" }}>
              {item.hotelId.title}
            </h2>
            <h2>{item.roomId.title}</h2>
            <div className="hotels-item-description mb20">
              {item.roomId.description}
            </div>

            <div style={dateStyle}>
              <div style={{ fontWeight: "700" }}>Дата заезда: </div>
              <div style={{ fontWeight: "700" }}>
                {new Date(item.dateStart).toLocaleDateString("ru-RU")}
              </div>
            </div>
            <div style={dateStyle}>
              <div style={{ fontWeight: "700" }}>Дата отъезда: </div>
              <div style={{ fontWeight: "700" }}>
                {new Date(item.dateEnd).toLocaleDateString("ru-RU")}
              </div>
            </div>

            <div className="hotels-item-buttons">
              {user?.role === "client" && (
                <>
                  <button className="addhotel-btn blue" onClick={fnViewRoom}>
                    Подробнее
                  </button>
                </>
              )}

              <button
                className="addhotel-btn red"
                onClick={() => deleteItem(item._id)}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
