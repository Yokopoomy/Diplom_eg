import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddRoom from "./AddRoom";
import { actRoomsList } from "../../store/actions/actionCreators";
import RoomsItems from "./RoomsItems";

export default function HotelsView() {
  const { user } = useSelector((state) => state.crUser);
  // Добавляем инициализацию по умолчанию, если rooms undefined
  const { rooms = [] } = useSelector((state) => state.rooms);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, title, description, files } = location.state.item;
  const hotelsPics = JSON.parse(files);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  useEffect(() => {
    const objParams = {
      offset: 0,
      limit: 10,
      hotelId: _id,
    };
    dispatch(actRoomsList(objParams));
  }, [isAddRoom, _id, dispatch]);

  const handleModalPics = useCallback((url) => {
    setIsModal((prev) => !prev);
    setUrlForModal(url);
  }, []);

  const handleCloseModalPics = useCallback(() => {
    setIsModal(false);
    setUrlForModal("");
  }, []);

  const handleEditHotel = useCallback(() => {
    navigate(`/hotels/edit/${_id}`);
  }, [navigate, _id]);

  return (
    <div className="mainpage">
      <div className="mb20">
        <h1 >{title}</h1>
      </div>
      <div className="addhotel-preview">
        {hotelsPics.map((item) => (
          <img
            key={item.url}
            alt="not found"
            className="view-pics-preview"
            src={backendUrl + item.url}
            onClick={() => handleModalPics(backendUrl + item.url)}
          />
        ))}
      </div>

      <div className="mb20">
        <span style={{ color: "#8a92a6" }}>{description}</span>
      </div>

      {user?.role === "admin" && (
        <div className="addhotel-btn">
          <button className="addhotel-btn red" onClick={handleEditHotel}>
            Редактировать
          </button>
          <button className="addhotel-btn blue" onClick={() => setIsAddRoom(true)}>
            Добавить номер
          </button>
        </div>
      )}

      {isModal && (
        <div className="modal-wrap">
          <div
            className="pics-modal"
            style={{ backgroundImage: `url(${urlForModal})` }}
          >
            <div className="close-modal" onClick={handleCloseModalPics}>
              &times;
            </div>
          </div>
        </div>
      )}

      {isAddRoom && <AddRoom setIsAddRoom={setIsAddRoom} hotelId={_id} />}

      <h2 className="hotels-header" style={{ backgroundColor: "#dfffe5", margin: "20px 0"}}>
        Выбрать и забронировать номер:
      </h2>

      {rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomsItems key={room._id} item={room} hotelState={location.state.item} />
        ))
      ) : (
        <p>Нет доступных номеров.</p>
      )}
    </div>
  );
}