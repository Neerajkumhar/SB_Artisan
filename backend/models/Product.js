const db = require('../config/db');

class Product {
  static async findAll(filters = {}) {
    const { search, category, subcategory, featured } = filters;
    let query = `
      SELECT p.*, 
             c.name as category_name, c.slug as category_slug,
             s.name as subcategory_name, s.slug as subcategory_slug,
             img.image_url as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      LEFT JOIN product_images img ON p.id = img.product_id AND img.is_primary = 1
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.material LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild);
    }

    if (category) {
      if (isNaN(category)) {
        query += ' AND c.slug = ?';
        params.push(category);
      } else {
        query += ' AND p.category_id = ?';
        params.push(parseInt(category));
      }
    }

    if (subcategory) {
      if (isNaN(subcategory)) {
        query += ' AND s.slug = ?';
        params.push(subcategory);
      } else {
        query += ' AND p.subcategory_id = ?';
        params.push(parseInt(subcategory));
      }
    }

    if (featured !== undefined) {
      query += ' AND p.featured = ?';
      params.push(featured ? 1 : 0);
    }

    query += ' ORDER BY p.id DESC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [products] = await db.execute(`
      SELECT p.*, 
             c.name as category_name, c.slug as category_slug,
             s.name as subcategory_name, s.slug as subcategory_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.id = ?
    `, [id]);

    if (!products[0]) return null;

    const [images] = await db.execute(
      'SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC',
      [id]
    );

    return {
      ...products[0],
      images
    };
  }

  static async findBySlug(slug) {
    const [products] = await db.execute(`
      SELECT p.*, 
             c.name as category_name, c.slug as category_slug,
             s.name as subcategory_name, s.slug as subcategory_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.slug = ?
    `, [slug]);

    if (!products[0]) return null;

    const [images] = await db.execute(
      'SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC',
      [products[0].id]
    );

    return {
      ...products[0],
      images
    };
  }

  static async create(productData) {
    const {
      category_id,
      subcategory_id,
      name,
      slug,
      description,
      material,
      dimensions,
      price,
      featured = 0,
      images = [] // Array of { url, is_primary }
    } = productData;

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [res] = await conn.execute(
        `INSERT INTO products 
         (category_id, subcategory_id, name, slug, description, material, dimensions, price, featured) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
         ,
        [category_id, subcategory_id, name, slug, description, material, dimensions, price, featured ? 1 : 0]
      );

      const productId = res.insertId;

      if (images && images.length > 0) {
        for (const img of images) {
          await conn.execute(
            'INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)',
            [productId, img.url, img.is_primary ? 1 : 0]
          );
        }
      }

      await conn.commit();
      return { id: productId, ...productData };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async update(id, productData) {
    const {
      category_id,
      subcategory_id,
      name,
      slug,
      description,
      material,
      dimensions,
      price,
      featured,
      images = []
    } = productData;

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.execute(
        `UPDATE products SET 
         category_id = ?, subcategory_id = ?, name = ?, slug = ?, 
         description = ?, material = ?, dimensions = ?, price = ?, featured = ? 
         WHERE id = ?`,
        [category_id, subcategory_id, name, slug, description, material, dimensions, price, featured ? 1 : 0, id]
      );

      if (images && images.length > 0) {
        // Remove existing images and replace them
        await conn.execute('DELETE FROM product_images WHERE product_id = ?', [id]);
        for (const img of images) {
          await conn.execute(
            'INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)',
            [id, img.url, img.is_primary ? 1 : 0]
          );
        }
      }

      await conn.commit();
      return { id, ...productData };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async delete(id) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Delete images first
      await conn.execute('DELETE FROM product_images WHERE product_id = ?', [id]);
      
      // Delete product
      const [res] = await conn.execute('DELETE FROM products WHERE id = ?', [id]);

      await conn.commit();
      return res.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}

module.exports = Product;
