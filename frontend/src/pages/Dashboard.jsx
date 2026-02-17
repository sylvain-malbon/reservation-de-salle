import { useAuth } from "../hooks/useAuth.js";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold text-primary font-fantasy mb-4">
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
            <div className="card-actions justify-end mt-6">
              <button className="btn btn-primary">Gérer mon profil</button>
              <button className="btn btn-accent">Mes réservations</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
