import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signup from "./components/users/Signup";
import Login from "./components/users/Login";
import Users from "./components/users/Users";
import UserView from "./components/users/UserView";
import UserEdit from "./components/users/UserEdit";
import Hotels from "./components/hotels/Hotels";
import AddHotel from "./components/hotels/AddHotel";
import HotelsView from "./components/hotels/HotelsView";
import FindRooms from "./components/hotels/FindRooms";
import RoomsView from "./components/hotels/RoomsView";
import Reservations from "./components/hotels/Reservations";
import ManagerChat from "./components/chats/ManagerChat";
import MgrReservations from "./components/hotels/MgrReservations";
import Page404 from "./components/Page404";
import EditHotel from "./components/hotels/EditHotel";
import EditRoom from "./components/hotels/EditRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/view/:id" element={<HotelsView />} />
          <Route path="/hotels/edit/:id" element={<EditHotel />} />
          <Route path="/room" element={<FindRooms />} />
          <Route path="/rooms/view/:id" element={<RoomsView />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />
          <Route path="/addhotel" element={<AddHotel />} />
          <Route path="/userview/:id" element={<UserView />} />
          <Route path="/useredit/:id" element={<UserEdit />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/managerchat" element={<ManagerChat />} />
          <Route path="/managerchat" element={<ManagerChat />} />
          <Route path="/mgrresevations/:id" element={<MgrReservations />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
