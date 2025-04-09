import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import Join from "./pages/Join";
import ChatMensa from "./pages/ChatMensa";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div className="app-container">
      {chatVisibility ? (
        <ChatMensa socket={socket} />
      ) : (
        <Join setSocket={setSocket} visibility={setChatVisibility} />
      )}
    </div>
  );
}

export default App;