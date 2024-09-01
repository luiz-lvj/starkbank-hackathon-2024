import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/home/Sidebar";
import CreditProvider from "./pages/CreditProvider";
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
            <Route path="/credit-providers" element={<CreditProvider />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
