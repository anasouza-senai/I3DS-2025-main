import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Headers from "./components/header/Header";

function App() {
  return (
    <>
      <BrowserRouter> 
      <Headers/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
        <footer>
          Olá
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
