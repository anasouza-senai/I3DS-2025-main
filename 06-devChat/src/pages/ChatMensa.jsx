import React, { useEffect, useRef, useState } from "react";

const ChatMensa = ({ socket }) => {
  const [mensagens, setMensagens] = useState([]);
  const inputRef = useRef();
  const chatRef = useRef();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      setMensagens((prev) => [...prev, event.data]);
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    };
  }, [socket]);

  const enviarMensagem = () => {
    const msg = inputRef.current.value;
    if (!msg.trim()) return;

    socket.send(msg);
    inputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  const getMensagemClasse = (mensagem) => {
    if (
      mensagem.includes("entrou no chat") ||
      mensagem.includes("saiu do chat")
    ) {
      return "msg-status";
    }

    return mensagem.startsWith(`${socket.usernameData}:`)
      ? "msg-enviada"
      : "msg-recebida";
  };

  return (
    <div className="chat-container">
      <div className="chat-header">DevChat</div>

      <div ref={chatRef} className="chat-box">
        {mensagens.map((msg, i) => (
          <div key={i} className={`mb-2 ${getMensagemClasse(msg)}`}>
            {msg}
          </div>
        ))}
      </div>

      <div className="input-group chat-input">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="form-control"
          type="text"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={enviarMensagem} className="btn btn-primary">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatMensa;
