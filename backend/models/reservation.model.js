// models/reservation.model.js
import db from '../config/db.js';

const Reservation = {
  async create({ title, start_date, end_date, user_id }) {
    const sql = `INSERT INTO reservations (title, start_date, end_date, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [title, start_date, end_date, user_id]);
    return { id: result.insertId, title, start_date, end_date, user_id };
  },

  async findById(id) {
    const sql = `SELECT * FROM reservations WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  async findAll() {
    const sql = `SELECT * FROM reservations`;
    const [rows] = await db.execute(sql);
    return rows;
  },

  async findByUser(user_id) {
    const sql = `SELECT * FROM reservations WHERE user_id = ?`;
    const [rows] = await db.execute(sql, [user_id]);
    return rows;
  },

  async update(id, { title, start_date, end_date }) {
    const sql = `UPDATE reservations SET title = ?, start_date = ?, end_date = ? WHERE id = ?`;
    await db.execute(sql, [title, start_date, end_date, id]);
    return this.findById(id);
  },

  async delete(id, user_id) {
    const sql = `DELETE FROM reservations WHERE id = ? AND user_id = ?`;
    await db.execute(sql, [id, user_id]);
    return true;
  },

  async findBetweenDates(start, end) {
    const sql = `SELECT * FROM reservations WHERE (start_date < ? AND end_date > ?)`;
    const [rows] = await db.execute(sql, [end, start]);
    return rows;
  }
};

export default Reservation;
