import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-base-content/60 text-center">
        Aucun utilisateur connecté.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">

      {/* Titre */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-brand text-base-content">Mon profil</h1>
        <p className="text-sm text-base-content/50">
          Informations de votre compte TechSpace Solutions
        </p>
      </div>

      {/* Carte profil */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 flex items-center gap-5 max-w-md">
        <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shrink-0">
          {user.firstname?.[0]}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-lg font-semibold text-base-content">
            {user.firstname} {user.lastname}
          </div>
          <div className="text-sm text-base-content/50">{user.email}</div>
        </div>
      </div>

    </div>
  );
}

export default Profile;
