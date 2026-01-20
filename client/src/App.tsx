import { Routes, Route } from "react-router-dom";
import DrawPage from "./pages/DrawPage";
import ManagePage from "./pages/ManagePage";

function App() {
  return (
    <div className="app">
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
