// components/Header.jsx
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
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
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo — shrink-0 pour qu'il ne cède jamais de place */}
        <Link
          className="btn btn-ghost btn-accent font-brand hover:scale-105 transition-transform shrink-0 text-sm sm:text-xl px-2 sm:px-4"
          to="/"
        >
          <span className="hidden sm:inline">Réservation de Salle</span>
          <span className="sm:hidden">RéservSalle</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 ml-2">
          {isAuthenticated &&
            (location.pathname === "/booking-schedule" ? (
              <button
                className="btn btn-sm btn-ghost flex items-center gap-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="w-5 h-5 shrink-0" />
                <span className="hidden sm:inline">Retour</span>
              </button>
            ) : (
              <NavLink
                to="/booking-schedule"
                className={({ isActive }) =>
                  isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost"
                }
              >
                <span className="hidden sm:inline">Planning de la Semaine</span>
                <span className="sm:hidden">Planning</span>
              </NavLink>
            ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Bulle utilisateur — initiale (+ nom sur sm+) */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-base-200">
                <Link
                  to="/profile"
                  className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center shrink-0"
                  title={`${user?.firstname} ${user?.lastname}`}
                >
                  <span className="text-lg font-bold">
                    {user?.firstname?.[0]}
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="font-medium text-base-content/80 hover:underline focus:underline outline-none hidden sm:inline"
                >
                  {user?.firstname} {user?.lastname}
                </Link>
              </div>
              {/* Déconnexion — icône sur mobile, texte sur sm+ */}
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost text-error"
                title="Se déconnecter"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 sm:hidden" />
                <span className="hidden sm:inline">Se déconnecter</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-1 sm:gap-2">
              <Link to="/register" className="btn btn-sm btn-accent">
                <span className="hidden sm:inline">Créer un compte</span>
                <span className="sm:hidden">S'inscrire</span>
              </Link>
              <Link to="/login" className="btn btn-sm btn-ghost">
                <span className="hidden sm:inline">Se connecter</span>
                <span className="sm:hidden">Connexion</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
