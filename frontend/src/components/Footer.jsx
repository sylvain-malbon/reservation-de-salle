// components/Footer.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function Footer() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <footer className="w-full bg-base-100 border-t border-base-200 py-4 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4">
        <nav className="flex items-center gap-4 mb-1">
          {isAuthenticated && (
            <NavLink
              to="/booking-schedule"
              className={({ isActive }) =>
                (isActive
                  ? "text-primary underline "
                  : "text-base-content/80 hover:underline ") +
                " text-sm lowercase font-medium transition-colors duration-150 px-1 py-0.5"
              }
            >
              tableau des réservations
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-error text-sm lowercase font-medium bg-transparent border-none px-1 py-0.5 hover:underline transition-colors duration-150"
              style={{ background: "none" }}
            >
              se déconnecter
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="text-accent text-sm lowercase font-medium px-1 py-0.5 hover:underline transition-colors duration-150"
              >
                créer un compte
              </Link>
              <Link
                to="/login"
                className="text-base-content/80 text-sm lowercase font-medium px-1 py-0.5 hover:underline transition-colors duration-150"
              >
                se connecter
              </Link>
            </>
          )}
        </nav>
        <p className="text-xs text-base-content/70 font-medium text-center w-full mt-1">
          © {new Date().getFullYear()} TechSpace Solutions - Tous droits
          réservés
        </p>
      </div>
    </footer>
  );
}
export default Footer;
