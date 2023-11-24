import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetSign from "./pages/GetSign";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanetInfo from "./pages/PlanetInfo";
import UserHome from "./pages/UserHome";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-sign" element={<GetSign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/planet-info/:planetName" element={<PlanetInfo />} />
      </Routes>
    </div>
  );
}

export default App;
