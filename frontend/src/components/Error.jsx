import { actUserError } from "../store/actions/actionCreators";
import { useDispatch } from "react-redux";

export default function WinError({ children, type, clearFields }) {
  const dispatch = useDispatch();

  const styleMess = {
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "black",
    fontSize: "20px",
    width: "100%",
    minHeight: "60px",
    padding: "20px",
    marginBottom: "20px",
    border: type === "err" ? "3px solid #dc3545" : "3px solid #198754",
    backgroundColor: type === "err" ? "#f8d7da" : "#d1e7dd",
  };

  const handleClose = () => {
    dispatch(actUserError({ message: "close", statusCode: "" }));
  };

  return (
    <div style={styleMess}>
      <div>{children}</div>
      <button
        className="hotels-item-btn"
        style={{ marginTop: "10px" }}
        onClick={handleClose}
      >
        Закрыть
      </button>
    </div>
  );
}