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
    <div className="hero min-h-[75vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="w-full flex flex-col items-center gap-6">
          {/* Titre */}
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-brand text-base-content leading-tight text-center">
              Bienvenue dans l'Intranet
              <br />
              <span className="text-primary">TechSpace Solutions</span>
            </h1>
          </div>

          {/* Accroche */}
          <p className="text-base text-base-content/60 max-w-md leading-relaxed">
            Réservez la salle de réunion simplement et évitez les conflits de
            planning entre équipes.
          </p>

          {/* Infos pratiques */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
            <span className="flex items-center gap-1 bg-base-100 text-base-content/60 border border-base-300 px-3 py-1 rounded-full">
              <CalendarDaysIcon className="w-3.5 h-3.5 shrink-0" />{" "}
              Lundi–Vendredi
            </span>
            <span className="flex items-center gap-1 bg-base-100 text-base-content/60 border border-base-300 px-3 py-1 rounded-full">
              <ClockIcon className="w-3.5 h-3.5 shrink-0" /> 8h00–19h00
            </span>
            <span className="flex items-center gap-1 bg-base-100 text-base-content/60 border border-base-300 px-3 py-1 rounded-full">
              <ClockIconSolid className="w-3.5 h-3.5 shrink-0" /> Minimum 1h
            </span>
            <span className="flex items-center gap-1 bg-base-100 text-base-content/60 border border-base-300 px-3 py-1 rounded-full">
              <UsersIcon className="w-3.5 h-3.5 shrink-0" /> 12 personnes max
            </span>
          </div>

          {/* CTA */}
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/booking-schedule" className="btn btn-primary btn-lg">
                Voir le Planning de la Semaine
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
