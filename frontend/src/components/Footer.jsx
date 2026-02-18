// components/Footer.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function Footer() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <footer className="bg-base-100 border-t border-base-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col items-center gap-3">
        <nav className="flex items-center gap-5">
          {isAuthenticated && (
            <NavLink
              to="/booking-schedule"
              className={({ isActive }) =>
                isActive
                  ? "text-xs text-primary font-medium underline"
                  : "text-xs text-base-content/50 font-medium hover:text-base-content transition-colors"
              }
            >
              Tableau des réservations
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-xs text-error font-medium hover:underline transition-colors bg-transparent border-none cursor-pointer"
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/register" className="text-xs text-accent font-medium hover:underline transition-colors">
                Créer un compte
              </Link>
              <Link to="/login" className="text-xs text-base-content/50 font-medium hover:text-base-content transition-colors">
                Se connecter
              </Link>
            </>
          )}
        </nav>
        <p className="text-xs text-base-content/40">
          © {new Date().getFullYear()} TechSpace Solutions — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
export default Footer;
