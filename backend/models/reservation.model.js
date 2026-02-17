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
    const sql = `
      SELECT r.*, u.firstname, u.lastname, u.email
      FROM reservations r
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.start_date ASC
    `;
    const [rows] = await db.execute(sql);
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      start_date: row.start_date,
      end_date: row.end_date,
      user_id: row.user_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      user: {
        firstname: row.firstname,
        lastname: row.lastname,
        email: row.email
      }
    }));
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
    const sql = `
      SELECT r.*, u.firstname, u.lastname, u.email
      FROM reservations r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE DATE(r.start_date) BETWEEN ? AND ?
      ORDER BY r.start_date ASC
    `;
    const [rows] = await db.execute(sql, [start, end]);
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      start_date: row.start_date,
      end_date: row.end_date,
      user_id: row.user_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      user: {
        firstname: row.firstname,
        lastname: row.lastname,
        email: row.email
      }
    }));
  }
};

export default Reservation;
