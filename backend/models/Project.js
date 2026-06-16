const db = require('../config/db');

class Project {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM projects ORDER BY completion_year DESC, id DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute('SELECT * FROM projects WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async create({ title, slug, project_type, location, client_name, description, image_url, completion_year }) {
    const [result] = await db.execute(
      `INSERT INTO projects (title, slug, project_type, location, client_name, description, image_url, completion_year) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, project_type, location, client_name, description, image_url, completion_year]
    );
    return { id: result.insertId, title, slug, project_type, location, client_name, description, image_url, completion_year };
  }

  static async update(id, { title, slug, project_type, location, client_name, description, image_url, completion_year }) {
    await db.execute(
      `UPDATE projects SET title = ?, slug = ?, project_type = ?, location = ?, 
       client_name = ?, description = ?, image_url = ?, completion_year = ? WHERE id = ?`,
      [title, slug, project_type, location, client_name, description, image_url, completion_year, id]
    );
    return { id, title, slug, project_type, location, client_name, description, image_url, completion_year };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Project;
