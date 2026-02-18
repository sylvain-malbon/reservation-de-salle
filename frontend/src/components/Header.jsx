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
    <header className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <Link
          className="btn btn-ghost btn-accent text-xl font-brand hover:scale-105 transition-transform"
          to="/"
        >
          Réservation de Salle
        </Link>
        <nav className="flex items-center gap-4 flex-1 justify-end">
          {isAuthenticated &&
            (location.pathname === "/booking-schedule" ? (
              <button
                className="btn btn-sm btn-ghost flex items-center gap-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="w-5 h-5" /> Retour
              </button>
            ) : (
              <NavLink
                to="/booking-schedule"
                className={({ isActive }) =>
                  isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost"
                }
              >
                Planning de la Semaine
              </NavLink>
            ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-4">
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-base-200">
                <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {user?.firstname?.[0]}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="font-medium text-base-content/80 hover:underline focus:underline outline-none"
                >
                  {user?.firstname} {user?.lastname}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost text-error"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="flex gap-2 ml-4">
              <Link to="/register" className="btn btn-sm btn-accent">
                Créer un compte
              </Link>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Se connecter
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
