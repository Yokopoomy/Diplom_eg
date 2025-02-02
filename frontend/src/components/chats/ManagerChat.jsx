import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ManagerChatItem from "./ManagerChatItem";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";
import { sendClientMessage } from "../../store/api/chat/sendClientMessage";
import { readMessage } from "../../store/api/chat/readMessage";

const socket = io.connect(process.env.REACT_APP_BACK_URL);

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [selectedLi, setSelectedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);
  const [mgrMessage, setMgrMessage] = useState("");
  const [socketData, setSocketData] = useState(null);
  const dialog = useRef();

  useEffect(() => {
    goToEndDialog();
  }, [messages]);

  useEffect(() => {
    const eventName = `serverToManager`;
    socket.on(eventName, (data) => {
      fetchChatsUsers(data);
    });

    return () => {
      socket.off(eventName);
    };
  }, [chatsUsers]);

  useEffect(() => {
    if (!chatsUsers) {
      fetchChatsUsers();
    }
    if (!socketData) return;

    const newChatsUsers = [...chatsUsers];
    newChatsUsers.forEach((item) => {
      if (item.user._id === socketData.clientId) {
        item.newMessage = true;
        if (chatOwner && item.user._id === chatOwner.user._id) {
          fetchUserRequest(chatOwner.chatId);
        }
      }
    });
    setChatsUsers(newChatsUsers);
  }, [socketData]);

  async function fetchChatsUsers(socketData) {
    try {
      const response = await getUsersFromRequests();
      const data = await response;
      data.forEach((item) => {
        item.newMessage = false;
      });
      setChatsUsers(data);
      if (socketData) setSocketData(socketData);
    } catch (err) {
      console.log("Ошибка в ManagerChat", err.message);
    }
  }

  async function fnLiOnClick(e, chatId, user) {
    e.preventDefault();
    setChatOwner({ chatId, user });

    if (selectedLi) {
      selectedLi.style.backgroundColor = "white";
      selectedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSelectedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";

    fetchUserRequest(chatId);

    const newChatsUsers = [...chatsUsers];
    newChatsUsers.forEach((item) => {
      if (item.user._id === user._id) {
        item.newMessage = false;
      }
    });
    setChatsUsers(newChatsUsers);
  }

  function goToEndDialog() {
    if (!chatOwner || !dialog.current) return;

    dialog.current.scrollTop = 99999;
    if (messages.at(-1).author !== chatOwner.user._id) return;

    const notReadMess = messages
      .filter((i) => i.author === chatOwner.user._id && !i.readAt)
      .map((i) => i._id);
    if (notReadMess.length < 1) return;

    const params = {
      id: chatOwner.chatId,
      body: {
        createdBefore: notReadMess,
      },
    };
    readMessage(params);
    const bodyToSocket = { clientId: chatOwner.user._id };
    socket.emit("managerReadMessage", bodyToSocket);
  }

  async function fetchUserRequest(chatId) {
    const dataRequest = await findRequestById(chatId);
    setMessages(dataRequest.messages);
  }

  function fnOnMouseOver(e) {
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === selectedLi) return;
    currentLi.style.backgroundColor = "#cfd2da";
    currentLi.firstChild.style.color = "black";
  }

  function fnOnMouseLeave(e) {
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === selectedLi) return;
    currentLi.style.backgroundColor = "white";
  }

  async function fnSendMessage() {
    if (mgrMessage.trim().length < 1) return;

    const body = { author: user._id, text: mgrMessage };
    const params = { id: { _id: chatOwner.chatId }, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) return;

    setMgrMessage("");
    const bodyToSocket = { clientId: chatOwner.user._id };
    socket.emit("managerToClient", bodyToSocket);
  }

  const saveBtnDisabled = !chatOwner;

  return (
    <>
      <div className="mainpage">
        <div className="mchat-wrap">
          <div className="mchat-users">
            <div className="mchat-header">
              <h2>Чаты клиентов</h2>
            </div>
            <div>
              <ul>
                {chatsUsers &&
                  chatsUsers.map((i) => (
                    <ManagerChatItem
                      key={i._id}
                      item={i}
                      fnLiOnClick={fnLiOnClick}
                      fnOnMouseOver={fnOnMouseOver}
                      fnOnMouseLeave={fnOnMouseLeave}
                    />
                  ))}
              </ul>
            </div>
          </div>

          <div className="mchat-dialog-wrap">
            <div ref={dialog} className="mchat-dialog">
              {messages &&
                messages.map((i) => (
                  <ManagerChatDialogItem
                    key={i._id}
                    item={i}
                    chatOwner={chatOwner.user}
                  />
                ))}
            </div>
            <div className="mchat-dialog-send">
              <input
                type="text"
                value={mgrMessage}
                onChange={(e) => setMgrMessage(e.target.value)}
                disabled={saveBtnDisabled}
              />
              <button
                className="mchat-dialog-btn"
                onClick={fnSendMessage}
                disabled={saveBtnDisabled}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
