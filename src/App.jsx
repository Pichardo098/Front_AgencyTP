import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import PrincipalView from "./pages/PrincipalView";
import MyProfile from "./pages/MyProfile";
import UserId from "./components/userId/UserId";

function App() {
  return (
    <div
      id="body"
      className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-400 "
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        {/* Rutas protegidas */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/principalView" element={<PrincipalView />}></Route>
          <Route path="/myProfile" element={<MyProfile />}></Route>
          <Route path="/user/:id" element={<UserId />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
