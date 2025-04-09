import React, { useRef } from "react";
import "../App.css";

const Join = (props) => {
  const usernameRef = useRef();

  const handleSubmit = () => {
    const username = usernameRef.current.value;
    if (!username.trim() || username.length < 3) {
      alert("Por favor, digite um nome de usuário válido.");
      return;
    }

    const ws = new WebSocket("ws://192.168.0.102:5000");

    ws.onopen = () => {
      ws.send(`username:${username}`);
      ws.usernameData = username;
      props.setSocket(ws);
      props.visibility(true);
    };

    ws.onerror = (err) => {
      console.error("Erro ao conectar no servidor:", err);
      alert("Erro ao conectar no servidor. Verifique se o back-end está rodando.");
    };
  };

  return (
    <div className="join-container d-flex flex-column align-items-center justify-content-center">
      <img src="logo.png" alt="Logo DevChat" className="logo-img mb-3" />

      <div className="join-box text-center">
        <h3 className="custom-title mb-3">Bem-vindo ao DevChat</h3>

        <div className="form-floating mb-3">
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="nomeUsuario"
            placeholder="Nome de usuário"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <label htmlFor="nomeUsuario">Nome de usuário</label>
        </div>

        <button className="btn-entrar" onClick={handleSubmit}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Join;
