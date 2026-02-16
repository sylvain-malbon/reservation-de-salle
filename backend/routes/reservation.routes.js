
import express from 'express';
import Reservation from '../models/reservation.model.js';
const router = express.Router();

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtenir toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtenir une réservation par ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifier une réservation
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.update(req.params.id, req.body);
    if (!updatedReservation) return res.status(404).json({ error: 'Réservation non trouvée' });
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.delete(req.params.id, req.body.user_id);
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
