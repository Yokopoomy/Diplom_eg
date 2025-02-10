import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actRegRoomsAdd } from "../../store/actions/actionCreators";

export default function RoomsView() {
  const { user } = useSelector((state) => state.crUser);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  const [dateStart, setDateStart] = useState(new Date().toISOString().split("T")[0]);
  const [dateEnd, setDateEnd] = useState(new Date().toISOString().split("T")[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, title, description, images } = location.state.item;
  const hotelState = location.state.hotelState;
  const hotelsPics = JSON.parse(images);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  const fnModalPics = (url) => {
    setIsModal(!isModal);
    setUrlForModal(url);
  };

  const fnCloseModalPics = () => {
    setIsModal(false);
    setUrlForModal("");
  };

  const fnReturn = () => {
    navigate(`/hotels/view/${hotelState._id}`, { state: { item: hotelState } });
  };

  // Обработчик изменения даты заезда
  const handleDateStartChange = (e) => {
    const newDateStart = e.target.value;
    setDateStart(newDateStart);

    // Если новая дата заезда позже текущей даты выезда, обновляем дату выезда
    if (newDateStart > dateEnd) {
      setDateEnd(newDateStart);
    }
  };

  // Обработчик изменения даты выезда
  const handleDateEndChange = (e) => {
    const newDateEnd = e.target.value;

    // Проверяем, что дата выезда не раньше даты заезда
    if (newDateEnd >= dateStart) {
      setDateEnd(newDateEnd);
    }
  };

  const fnRegisterRoom = () => {
    const newRegrooms = {
      userId: user._id,
      hotelId: hotelState._id,
      roomId: _id,
      dateStart,
      dateEnd,
    };
    dispatch(actRegRoomsAdd(newRegrooms));
    navigate("/reservations");
  };

  const fnEditRoom = () => {
    console.log("Редактируем номер");
  };

  return (
    <>
      <div className="mainpage">
        <div className="addhotel-preview">
          {hotelsPics.map((item, index) => (
            <img
              key={item.url}
              alt="not found"
              className="view-pics-preview"
              src={backendUrl + item.url}
              onClick={() => fnModalPics(backendUrl + item.url)}
            />
          ))}
        </div>
        <div className="mb20">
          <h1 style={{ color: "black" }}>{title}</h1>
        </div>
        <div className="mb20">
          <span style={{ color: "#8a92a6" }}>{description}</span>
        </div>
        {!user && (
          <div
            className="hotels-item-wrap"
            style={{
              display: "block",
              backgroundColor: "#fcfee2",
            }}
          >
            <h2>Для возможности бронирования номера необходимо войти в систему!</h2>
          </div>
        )}
        {user && user.role === "client" && (
          <div
            className="hotels-item-wrap"
            style={{
              display: "block",
              backgroundColor: "#fcfee2",
            }}
          >
            <div className="findrooms dates">
              <div className="findrooms date">Заезд</div>
              <div className="findrooms date">Выезд</div>
            </div>
            <div className="findrooms dates mb20">
              <input
                type="date"
                className="findrooms date"
                value={dateStart}
                onChange={handleDateStartChange}
              />
              <input
                type="date"
                className="findrooms date"
                value={dateEnd}
                min={dateStart} // Устанавливаем минимальную дату выезда равной дате заезда
                onChange={handleDateEndChange}
              />
            </div>
            <div className="addhotel-btn">
              <button className="addhotel-btn red" onClick={fnRegisterRoom}>
                Забронировать
              </button>
              {user && user.role === "admin" && (
                <button className="addhotel-btn blue" onClick={fnEditRoom}>
                  Редактировать
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {isModal && (
        <div className="modal-wrap">
          <div
            className="pics-modal"
            style={{ backgroundImage: `url(${urlForModal})` }}
          >
            <div className="close-modal" onClick={fnCloseModalPics}>
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
}