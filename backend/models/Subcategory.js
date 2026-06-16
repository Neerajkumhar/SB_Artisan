const db = require('../config/db');

class Subcategory {
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT s.*, c.name as category_name 
      FROM subcategories s
      LEFT JOIN categories c ON s.category_id = c.id
      ORDER BY s.name ASC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM subcategories WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute('SELECT * FROM subcategories WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async findByCategoryId(categoryId) {
    const [rows] = await db.execute('SELECT * FROM subcategories WHERE category_id = ? ORDER BY name ASC', [categoryId]);
    return rows;
  }

  static async create({ category_id, name, slug, description }) {
    const [result] = await db.execute(
      'INSERT INTO subcategories (category_id, name, slug, description) VALUES (?, ?, ?, ?)',
      [category_id, name, slug, description]
    );
    return { id: result.insertId, category_id, name, slug, description };
  }

  static async update(id, { category_id, name, slug, description }) {
    await db.execute(
      'UPDATE subcategories SET category_id = ?, name = ?, slug = ?, description = ? WHERE id = ?',
      [category_id, name, slug, description, id]
    );
    return { id, category_id, name, slug, description };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM subcategories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Subcategory;
