import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-brand mb-6 text-primary drop-shadow-lg leading-tight">
            Vous pouvez <br></br>Réserver une Salle.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-base-content/80 font-medium">
            Bienvenue dans l'Intranet de TechSpace Solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Accéder au Tableau de bord
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-accent btn-lg">
                  S'inscrire
                </Link>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
