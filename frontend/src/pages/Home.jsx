import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon as ClockIconSolid } from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth.js";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-brand mb-6 text-primary drop-shadow-lg leading-tight">
            Bienvenue dans l'Intranet
            <br />
            de TechSpace Solutions
          </h1>

          <p className="text-lg md:text-xl mb-4 text-base-content/80 font-medium">
            Réservez la salle de réunion simplement et évitez les conflits de
            planning entre équipes.
          </p>

          <p className="text-sm mb-8 text-base-content/60 font-medium flex flex-wrap justify-center items-center gap-3">
            <span className="flex items-center gap-1"><CalendarDaysIcon className="w-5 h-5" /> Lundi–Vendredi</span>
            <span className="flex items-center gap-1"><ClockIcon className="w-5 h-5" /> 8h00–19h00</span>
            <span className="flex items-center gap-1"><ClockIconSolid className="w-5 h-5" /> Minimum 1h</span>
            <span className="flex items-center gap-1"><UsersIcon className="w-5 h-5" /> 12 personnes max</span>
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/booking-schedule" className="btn btn-primary btn-lg">
                Voir le planning
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-accent btn-lg">
                  Créer un compte
                </Link>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Se connecter
                </Link>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <p className="mt-6 text-sm text-base-content/60 font-medium">
              Un compte est nécessaire pour effectuer une réservation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
