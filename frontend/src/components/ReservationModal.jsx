// components/ReservationModal.jsx
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuth } from "../hooks/useAuth";
import { reservationService } from "../services/api";

function ReservationModal({ slot, onClose, onSuccess }) {
  const { user } = useAuth();
  const [title, setTitle] = useState(slot?.reservation?.title || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isOwnReservation = slot?.reservation?.user_id === user?.id;
  const canModify = isOwnReservation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (title.trim().length < 3) {
      setError("L'objet de la réunion doit contenir au moins 3 caractères");
      return;
    }

    setLoading(true);
    try {
      // Construction des champs attendus par le backend
      const start_date = `${format(slot.day, "yyyy-MM-dd")} ${String(slot.hour).padStart(2, "0")}:00:00`;
      const end_date = `${format(slot.day, "yyyy-MM-dd")} ${String(slot.hour + 1).padStart(2, "0")}:00:00`;
      const reservationData = {
        title,
        start_date,
        end_date,
      };

      if (slot.reservation) {
        // Modification
        await reservationService.update(slot.reservation.id, reservationData);
      } else {
        // Création
        await reservationService.create(reservationData);
      }

      onSuccess();
    } catch (err) {
      setError(err.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      return;
    }

    setLoading(true);
    try {
      await reservationService.delete(slot.reservation.id);
      onSuccess();
    } catch (err) {
      setError(err.message || "Erreur lors de l'annulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-brand text-2xl text-primary mb-4">
          {slot?.reservation ? "Réservation existante" : "Nouvelle réservation"}
        </h3>

        <div className="mb-4 p-4 bg-base-200 rounded-lg">
          <p className="font-semibold text-lg">
            {format(slot?.day, "EEEE dd MMMM yyyy", { locale: fr })}
          </p>
          <p className="text-sm opacity-70">
            De {slot?.hour}:00 à {slot?.hour + 1}:00
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {slot?.reservation && !canModify ? (
          // Réservation d'un autre utilisateur
          <div className="space-y-4">
            <div className="alert alert-info">
              <span>Ce créneau est déjà réservé</span>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Objet :</span>{" "}
                {slot.reservation.title}
              </div>
              <div>
                <span className="font-semibold">Réservé par :</span>{" "}
                {slot.reservation.user?.firstname}{" "}
                {slot.reservation.user?.lastname}
              </div>
            </div>
            <button className="btn btn-ghost w-full" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          // Nouveau créneau ou propre réservation
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Objet de la réunion
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Ex: Réunion d'équipe, Présentation client..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={3}
                disabled={loading}
              />
              <label className="label">
                <span className="label-text-alt opacity-70">
                  Minimum 3 caractères
                </span>
              </label>
            </div>

            <div className="modal-action">
              {slot?.reservation && canModify && (
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Annuler la réservation
                </button>
              )}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
                disabled={loading}
              >
                Fermer
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "En cours..."
                  : slot?.reservation
                    ? "Modifier"
                    : "Réserver"}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default ReservationModal;
