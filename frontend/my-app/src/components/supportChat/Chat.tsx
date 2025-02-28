import React, { ChangeEvent, useEffect, useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "./chat.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  changeStateLoading,
  performChatWithAi,
  selectIsLoadingResFromAi,
  selectResponsefromAi,
} from "../../redux/reducer/reducer-chat";
import { eventNames } from "process";
import { buffer } from "stream/consumers";
import { convertFileToBase64 } from "../../util/convertBase64";

export default function ChatAi() {
  const [mess, setMess] = useState<any>([]);
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [img, setImg] = useState<string | ArrayBuffer | null>();
  const dispath = useAppDispatch();
  function handleSend(type: any, val: any) {
    setImg(null);
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
      dispath(performChatWithAi({ text: val, img }));
      setTyping(true);
    }
  }
  const dataAi = useAppSelector(selectResponsefromAi);
  const isLoading = useAppSelector(selectIsLoadingResFromAi);
  if (isLoading == false && dataAi) {
    appendMsg({
      type: "text",
      content: { text: dataAi.text },
    });

    dispath(changeStateLoading());
  }
  const hanlderOnclickInputImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const base64 = await convertFileToBase64(target.files[0]);
      setImg(base64);
    }
  };
  useEffect(() => {
    const input = document.querySelector(".Composer-inputWrap");
    const ChatFooter = document.querySelector(".ChatFooter");
    const div = document.createElement("div");
    div.className = "chat-image";
    const i = document.createElement("i");
    const file = document.createElement("input");
    file.type = "file";
    file.id = "image";
    file.hidden = true;
    file.addEventListener("change", (event) => hanlderOnclickInputImage(event));
    const label = document.createElement("label");
    label.htmlFor = "image";
    i.className = "fa-solid fa-image";
    const imgDiv = document.createElement("div");
    const preimg = document.createElement("img");
    imgDiv.className = "preImg";
    preimg.className = "displayImg";
    imgDiv.append(preimg);
    ChatFooter?.append(imgDiv);
    if (input) {
      input.append(div);
      label.append(i);
      div.append(label);
      div.append(file);
    }
  }, []);

  useEffect(() => {
    if (img) {
      const imgDiv = document.querySelector(".preImg") as HTMLDivElement;
      imgDiv.classList.add("active");
      const image = document.querySelector(".displayImg") as HTMLImageElement;
      if (image) {
        image.src = `data:image/jpeg;base64,${img}`;
      }
    } else {
      const imgDiv = document.querySelector(".preImg") as HTMLDivElement;
      if (imgDiv) {
        imgDiv.classList.remove("active");
      }
    }
  }, [img]);
  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "CHAT AI" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      locale="en-US"
      placeholder="Enter word..."
    />
  );
}
