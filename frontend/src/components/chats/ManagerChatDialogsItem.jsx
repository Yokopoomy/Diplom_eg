import React from "react";
import vGreen from "../../pics/v-green.png";
import vvGreen from "../../pics/vv-green.png";

export default function ManagerChatDialogItem({ item, chatOwner }) {
  const checkRead = item.readAt ? vvGreen : vGreen;

  const clientRead =
    chatOwner.role === "client" ? null : (
      <div className="client-read">
        <img className="message-read-pics" src={checkRead} alt="view" />
      </div>
    );

  const managerRead =
    chatOwner.role === "client" ? (
      <div className="manager-read">
        <img className="message-read-pics" src={checkRead} alt="view" />
      </div>
    ) : null;

  return (
    <>
      {item.author === chatOwner._id ? (
        <div className="message-wrap" style={{ justifyContent: "flex-end" }}>
          <div className="message-client">
            {item.text}
            {managerRead}
          </div>
        </div>
      ) : (
        <div className="message-wrap">
          <div className="message-manager">
            {item.text}
            {clientRead}
          </div>
        </div>
      )}
    </>
  );
}
