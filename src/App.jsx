import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetSign from "./pages/GetSign";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanetInfo from "./pages/PlanetInfo";
import UserHome from "./pages/UserHome";
import Cicles from "./pages/Cicles";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-sign/:newUserId" element={<GetSign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home/:id" element={<UserHome />} />
        <Route
          path="/planet-info/:planetName/:id"
          element={<PlanetInfo />}
        />
        <Route path="/cicles/:id" element={<Cicles />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/user-chat/:id" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
