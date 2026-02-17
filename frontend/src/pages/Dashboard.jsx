import { useAuth } from "../hooks/useAuth.js";
import Planning from "../components/Planning.jsx";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Carte de bienvenue */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-brand text-primary mb-4">
              Bienvenue {user?.firstname} !
            </h1>
            <div className="divider"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="badge badge-primary badge-lg">Email</div>
                <p className="text-base-content">{user?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="badge badge-secondary badge-lg">Nom</div>
                <p className="text-base-content">
                  {user?.firstname} {user?.lastname}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Planning des réservations */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Planning />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
