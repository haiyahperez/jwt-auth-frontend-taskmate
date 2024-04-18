import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="navbar-container border-4 shadow-lg border-purple-200">
      <h2>
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <h1 className="nav-bar-title pl-8">TaskMate</h1>
        </Link>
      </h2>
      <div className="nav-login-button">
        {!toggleLogin ? (
          <Link to={"/login"}>
            <span className="login-link">Login</span>
          </Link>
        ) : (
          <div className="login-link">
            {user && <span>Hello, {user.username.toUpperCase()} | </span>}
            <Link onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default NavBar;
