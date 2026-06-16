const db = require('../config/db');

class Blog {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM blogs ORDER BY published_date DESC, id DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute('SELECT * FROM blogs WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async create({ title, slug, excerpt, content, featured_image, author, published_date }) {
    const [result] = await db.execute(
      `INSERT INTO blogs (title, slug, excerpt, content, featured_image, author, published_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, excerpt, content, featured_image, author, published_date]
    );
    return { id: result.insertId, title, slug, excerpt, content, featured_image, author, published_date };
  }

  static async update(id, { title, slug, excerpt, content, featured_image, author, published_date }) {
    await db.execute(
      `UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, 
       featured_image = ?, author = ?, published_date = ? WHERE id = ?`,
      [title, slug, excerpt, content, featured_image, author, published_date, id]
    );
    return { id, title, slug, excerpt, content, featured_image, author, published_date };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM blogs WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Blog;
