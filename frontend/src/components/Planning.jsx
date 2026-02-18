// components/Planning.jsx
import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import ReservationModal from "./ReservationModal";
import { reservationService } from "../services/api";

function Planning() {
  const [reservations, setReservations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Horaires disponibles : 8h à 19h
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // [8, 9, 10, ..., 18]

  // Calculer la semaine en cours (lundi à vendredi)
  const getWeekDays = () => {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 5 }, (_, i) => addDays(monday, i));
  };

  const weekDays = getWeekDays();

  // Charger les réservations
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
      const friday = addDays(monday, 4);

      const data = await reservationService.getByWeek(
        format(monday, "yyyy-MM-dd"),
        format(friday, "yyyy-MM-dd"),
      );
      console.log("Réservations reçues du backend:", data);
      setReservations(data);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations", error);
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si un créneau est réservé (couvre les réservations multi-heures)
  const isSlotReserved = (day, hour) => {
    return reservations.find((res) => {
      const startDate = new Date(res.start_date);
      const endDate = new Date(res.end_date);
      const resDay = startDate.toDateString();
      const dayDate = day.toDateString();
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();
      // Le créneau est couvert si hour >= startHour ET hour < endHour
      return resDay === dayDate && hour >= startHour && hour < endHour;
    });
  };

  // Vérifier si un créneau est dans le passé
  const isSlotPast = (day, hour) => {
    const slotDate = new Date(day);
    slotDate.setHours(hour, 0, 0, 0);
    return isBefore(slotDate, new Date());
  };

  // Gérer le clic sur un créneau
  const handleSlotClick = (day, hour) => {
    if (isSlotPast(day, hour)) return;

    const reservation = isSlotReserved(day, hour);
    // Si réservation multi-heures, utiliser son heure de début réelle
    const startHour = reservation
      ? new Date(reservation.start_date).getHours()
      : hour;

    setSelectedSlot({
      day,
      hour: startHour,
      reservation: reservation || null,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">
          Planning de la Semaine
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error-success rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error-pastel rounded"></div>
            <span>Occupé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded"></div>
            <span>Passé</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm">
            <thead>
              <tr>
                <th className="bg-base-200">Heure</th>
                {weekDays.map((day) => (
                  <th
                    key={day.toISOString()}
                    className="text-center bg-base-200"
                  >
                    <div className="font-bold">
                      {format(day, "EEEE", { locale: fr })}
                    </div>
                    <div className="text-xs opacity-70">
                      {format(day, "dd/MM")}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className="font-semibold bg-base-200">
                    {hour}:00 - {hour + 1}:00
                  </td>
                  {weekDays.map((day) => {
                    const reservation = isSlotReserved(day, hour);
                    const isPast = isSlotPast(day, hour);

                    return (
                      <td
                        key={`${day.toISOString()}-${hour}`}
                        className={`text-center cursor-pointer hover:brightness-110 transition-all ${
                          isPast
                            ? "bg-base-300 cursor-not-allowed"
                            : reservation
                              ? "bg-error-pastel text-error-content"
                              : "bg-error-success text-success-content hover:scale-105"
                        }`}
                        onClick={() => handleSlotClick(day, hour)}
                      >
                        {reservation ? (
                          <div className="p-2">
                            <div className="font-semibold text-sm truncate">
                              {reservation.title}
                            </div>
                            <div className="text-xs opacity-80">
                              {reservation.user?.firstname}{" "}
                              {reservation.user?.lastname}
                            </div>
                          </div>
                        ) : isPast ? (
                          <span className="opacity-50">-</span>
                        ) : (
                          <span className="text-lg">+</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ReservationModal
          slot={selectedSlot}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
          onSuccess={() => {
            fetchReservations();
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
        />
      )}
    </div>
  );
}

export default Planning;
