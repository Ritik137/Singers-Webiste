import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Songs from "../pages/Songs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import SongDetails from "../pages/SongDetails";
import Favourites from "../pages/Favourites";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/songs" element={<Songs />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/song/:id" element={<SongDetails />} />

        <Route path="/favourites" element={<Favourites />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;