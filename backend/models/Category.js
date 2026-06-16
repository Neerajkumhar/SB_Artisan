const db = require('../config/db');

class Category {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async create({ name, slug, description }) {
    const [result] = await db.execute(
      'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
      [name, slug, description]
    );
    return { id: result.insertId, name, slug, description };
  }

  static async update(id, { name, slug, description }) {
    await db.execute(
      'UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
      [name, slug, description, id]
    );
    return { id, name, slug, description };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Category;
