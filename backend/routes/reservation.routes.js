
import express from 'express';
import Reservation from '../models/reservation.model.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

// Créer une réservation
router.post('/', authMiddleware, async (req, res) => {
  try {
    // On récupère l'ID utilisateur depuis le middleware d'authentification
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }
    const { title, start_date, end_date } = req.body;
    if (!title || !start_date || !end_date) {
      return res.status(400).json({ error: "Champs manquants" });
    }
    const reservation = await Reservation.create({ title, start_date, end_date, user_id });
    console.log('Nouvelle réservation créée :', reservation);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtenir toutes les réservations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { start, end } = req.query;
    console.log('GET /reservations - Paramètres:', { start, end });
    let reservations;
    if (start && end) {
      reservations = await Reservation.findBetweenDates(start, end);
    } else {
      reservations = await Reservation.findAll();
    }
    // Adapter les champs pour le frontend
    const mapped = reservations.map(r => {
      const startDateStr = r.start_date instanceof Date 
        ? r.start_date.toISOString() 
        : String(r.start_date);
      const endDateStr = r.end_date instanceof Date 
        ? r.end_date.toISOString() 
        : String(r.end_date);
      
      return {
        ...r,
        date: startDateStr.split('T')[0],
        startTime: startDateStr,
        endTime: endDateStr,
      };
    });
    console.log(`Réservations trouvées: ${mapped.length}`, mapped);
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtenir une réservation par ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifier une réservation
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }
    // Vérifier que la réservation appartient à l'utilisateur
    const existingReservation = await Reservation.findById(req.params.id);
    if (!existingReservation) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    if (existingReservation.user_id !== user_id) {
      return res.status(403).json({ error: 'Non autorisé à modifier cette réservation' });
    }
    const updatedReservation = await Reservation.update(req.params.id, req.body);
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer une réservation
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }
    await Reservation.delete(req.params.id, user_id);
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
