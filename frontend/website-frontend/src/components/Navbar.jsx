import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <h1 className="text-3xl font-bold text-yellow-400">Atharva Bhaskar</h1>

        <div className="flex gap-8 text-lg items-center">
          <Link to="/">Home</Link>
          <Link to="/songs">Songs</Link>
          <Link to="/favourites">Favourites</Link>

          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;