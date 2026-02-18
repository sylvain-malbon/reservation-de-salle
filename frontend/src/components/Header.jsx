// components/Header.jsx
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth.js";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          className="btn btn-ghost btn-accent text-xl font-brand hover:scale-105 transition-transform"
          to="/"
        >
          Réservation de Salle
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated &&
          (location.pathname === "/booking-schedule" ? (
            <button
              className="btn btn-sm btn-ghost flex items-center gap-1"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="w-5 h-5" /> Retour
            </button>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink
                  to="/booking-schedule"
                  className={({ isActive }) =>
                    isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost"
                  }
                >
                  Tableau des Réservations
                </NavLink>
              </li>
            </ul>
          ))}
        <div className="ml-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-base-200">
                <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {user?.firstname?.[0]}
                  </span>
                </div>
                <span className="font-medium text-base-content/80">
                  {user?.firstname} {user?.lastname}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost text-error"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/register" className="btn btn-sm btn-accent">
                Créer un compte
              </Link>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
