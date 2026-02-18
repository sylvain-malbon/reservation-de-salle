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
        <div className="max-w-2xl flex flex-col items-center gap-8">

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-brand text-primary drop-shadow-lg leading-tight">
            Bienvenue dans l'Intranet
            <br />
            de TechSpace Solutions
          </h1>

          {/* Accroche */}
          <p className="text-lg md:text-xl text-base-content/80 font-medium max-w-lg leading-relaxed">
            Réservez la salle de réunion simplement et évitez les conflits de
            planning entre équipes.
          </p>

          {/* Infos pratiques */}
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
            <span className="flex items-center gap-1.5 bg-base-300 text-base-content/70 px-3 py-1.5 rounded-full">
              <CalendarDaysIcon className="w-4 h-4 shrink-0" /> Lundi–Vendredi
            </span>
            <span className="flex items-center gap-1.5 bg-base-300 text-base-content/70 px-3 py-1.5 rounded-full">
              <ClockIcon className="w-4 h-4 shrink-0" /> 8h00–19h00
            </span>
            <span className="flex items-center gap-1.5 bg-base-300 text-base-content/70 px-3 py-1.5 rounded-full">
              <ClockIconSolid className="w-4 h-4 shrink-0" /> Minimum 1h
            </span>
            <span className="flex items-center gap-1.5 bg-base-300 text-base-content/70 px-3 py-1.5 rounded-full">
              <UsersIcon className="w-4 h-4 shrink-0" /> 12 personnes max
            </span>
          </div>

          {/* CTA */}
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/booking-schedule" className="btn btn-primary btn-lg">
                Voir le Tableau des Réservations
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

          {/* Note */}
          {!isAuthenticated && (
            <p className="text-sm text-base-content/40 italic">
              Un compte est nécessaire pour effectuer une réservation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
