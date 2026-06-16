const db = require('../config/db');

class Inquiry {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM inquiries ORDER BY id DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM inquiries WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ name, company_name, email, phone, country, message, inquiry_type, status = 'New', notes = '' }) {
    const [result] = await db.execute(
      `INSERT INTO inquiries (name, company_name, email, phone, country, message, inquiry_type, status, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, company_name, email, phone, country, message, inquiry_type, status, notes]
    );
    return { id: result.insertId, name, company_name, email, phone, country, message, inquiry_type, status, notes };
  }

  static async updateStatusAndNotes(id, { status, notes }) {
    await db.execute(
      'UPDATE inquiries SET status = ?, notes = ? WHERE id = ?',
      [status, notes, id]
    );
    return { id, status, notes };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM inquiries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Inquiry;
