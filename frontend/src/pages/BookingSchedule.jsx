import { useAuth } from "../hooks/useAuth.js";
import Planning from "../components/Planning.jsx";

function BookingSchedule() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">

      {/* Titre */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-brand text-base-content">
          Bonjour, {user?.firstname} !
        </h1>
        <p className="text-sm text-base-content/50">
          Planning de la salle de réunion — semaine en cours
        </p>
      </div>

      {/* Planning */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6">
        <Planning />
      </div>

    </div>
  );
}
export default BookingSchedule;
