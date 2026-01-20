import { Routes, Route, Link } from "react-router-dom";
import DrawPage from "./pages/DrawPage";
import ManagePage from "./pages/ManagePage";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🃏 Emoji Tarot</h1>
        <nav>
          <Link to="/">Draw Card</Link>
          <Link to="/manage">Manage Deck</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<DrawPage />} />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
