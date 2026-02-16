import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 font-fantasy text-primary drop-shadow-lg">
            Bienvenue sur le Starter Kit
          </h1>
          <p className="text-lg mb-8 text-base-content/80">
            Template moderne{" "}
            <span className="font-semibold text-accent">React</span> +{" "}
            <span className="font-semibold text-accent">Node.js</span> +{" "}
            <span className="font-semibold text-accent">MySQL</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Accéder au Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-accent btn-lg">
                  Commencer
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
