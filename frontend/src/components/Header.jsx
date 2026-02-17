// components/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-xl font-brand text-primary hover:scale-105 transition-transform"
          to="/"
        >
          Réservation de Salle
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost"
                }
              >
                Tableau des Réservations
              </NavLink>
            </li>
          </ul>
        )}
        <div className="ml-2">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
                  <span className="text-lg">{user?.firstname?.[0]}</span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="menu-title">
                  <span>
                    {user?.firstname} {user?.lastname}
                  </span>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-sm btn-ghost">
                Se connecter
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
