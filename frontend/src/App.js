import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import './styles/App.css';
import '@fontsource-variable/montserrat';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Adicione outras rotas aqui */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
