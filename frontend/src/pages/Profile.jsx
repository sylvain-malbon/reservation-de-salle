import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-8 text-center">Aucun utilisateur connecté.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Mon profil</h2>
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
          {user.firstname?.[0]}
        </div>
        <div>
          <div className="text-lg font-semibold">{user.firstname} {user.lastname}</div>
          <div className="text-base-content/70">{user.email}</div>
        </div>
      </div>
      {/* Ajoute ici d'autres infos ou actions liées au profil */}
    </div>
  );
}

export default Profile;
