import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Onboarding } from "./pages";
import { wallpapers } from "./staticData";

function App() {
  return (
    <div className="App">
      <div
        className="App font-mono text-slate-200 h-screen w-screen"
        style={{
          backgroundImage: `url(${
            wallpapers[Math.floor(Math.random() * 10 - 0)]
          })`,
          backgroundSize: "cover",
        }}
      >
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
