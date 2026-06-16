# SB Artisan REST API Documentation

This document describes the REST API endpoints available for the Jodhpur Showroom registry backend server.

---

## Getting Started

### 1. Configure Environment Variables
Create a `.env` file at the root of the `backend` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=r051005d
DB_NAME=sb_artisan
DB_PORT=3306
JWT_SECRET=sb_artisan_golden_key_2026
JWT_EXPIRE=24h
```

### 2. Start the Server
Run the Express server in development mode:
```bash
npm run dev
```
The server will start on port `5000` (default).

---

## Authentication API

All modifying actions (POST, PUT, DELETE) on resources require the request header:
`Authorization: Bearer <your_jwt_token>`

### Admin Login
* **URL**: `/api/auth/login`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body**:
  ```json
  {
    "email": "rahul05@sbartisan.com",
    "password": "200505"
  }
  ```
  *(Note: Setting `"email": "rahul05"` is also accepted for frontend compatibility).*
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "fullName": "Rahul Dev",
      "email": "rahul05@sbartisan.com",
      "role": "admin"
    }
  }
  ```

---

## Categories API

### Get All Categories
* **URL**: `/api/categories`
* **Method**: `GET`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Restaurant Furniture",
        "slug": "restaurant-furniture",
        "description": "..."
      }
    ]
  }
  ```

### Get Category by ID or Slug
* **URL**: `/api/categories/:slugOrId`
* **Method**: `GET`

### Create Category (Admin Only)
* **URL**: `/api/categories`
* **Method**: `POST`
* **Body**:
  ```json
  {
    "name": "Lounge Seating",
    "slug": "lounge-seating",
    "description": "Premium lobby lounge sets."
  }
  ```

### Update Category (Admin Only)
* **URL**: `/api/categories/:id`
* **Method**: `PUT`

### Delete Category (Admin Only)
* **URL**: `/api/categories/:id`
* **Method**: `DELETE`

---

## Subcategories API

### Get All Subcategories
* **URL**: `/api/subcategories`
* **Method**: `GET`

### Get Subcategories by Parent Category ID
* **URL**: `/api/subcategories/category/:categoryId`
* **Method**: `GET`

### Create Subcategory (Admin Only)
* **URL**: `/api/subcategories`
* **Method**: `POST`
* **Body**:
  ```json
  {
    "category_id": 1,
    "name": "Dining Armchairs",
    "slug": "dining-armchairs",
    "description": "Bespoke fine-dining chairs."
  }
  ```

---

## Products API

### Get All Products (With Filters)
* **URL**: `/api/products`
* **Method**: `GET`
* **Query Parameters**:
  - `search` (string) - Matches name, description, or material (e.g. `?search=Haveli`)
  - `category` (string/number) - Matches category ID or slug (e.g. `?category=restaurant-furniture`)
  - `subcategory` (string/number) - Matches subcategory ID or slug (e.g. `?subcategory=seating`)
  - `featured` (boolean) - Matches featured status (`true` or `false`)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "category_id": 1,
        "subcategory_id": 11,
        "name": "Haveli Reclaimed Teak Dining Chair",
        "slug": "haveli-reclaimed-teak-dining-chair",
        "description": "...",
        "material": "Reclaimed Teakwood, Natural Rattan Cane, Brushed Brass Dowels",
        "dimensions": "82 x 54 x 56 cm",
        "price": "24500.00",
        "featured": 1,
        "category_name": "Restaurant Furniture",
        "subcategory_name": "Dining Seating",
        "primary_image": "https://images.unsplash.com/...jpg"
      }
    ]
  }
  ```

### Get Product by ID or Slug (Includes Image Gallery)
* **URL**: `/api/products/:slugOrId`
* **Method**: `GET`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Haveli Reclaimed Teak Dining Chair",
      "slug": "haveli-reclaimed-teak-dining-chair",
      "images": [
        { "image_url": "https://...", "is_primary": 1 },
        { "image_url": "https://...", "is_primary": 0 }
      ]
    }
  }
  ```

### Create Product (Admin Only)
* **URL**: `/api/products`
* **Method**: `POST`
* **Body**:
  ```json
  {
    "category_id": 1,
    "subcategory_id": 11,
    "name": "Udaipur Teak Credenza",
    "slug": "udaipur-teak-credenza",
    "description": "...",
    "material": "Teakwood, Brass details",
    "dimensions": "78 x 160 x 45 cm",
    "price": 68000.00,
    "featured": true,
    "images": [
      { "url": "https://primary-image.jpg", "is_primary": true },
      { "url": "https://gallery-image.jpg", "is_primary": false }
    ]
  }
  ```

---

## Blogs API

### Get All Blog Articles
* **URL**: `/api/blogs`
* **Method**: `GET`

### Create Blog Article (Admin Only)
* **URL**: `/api/blogs`
* **Method**: `POST`
* **Body**:
  ```json
  {
    "title": "Kiln Seasoning Techniques",
    "slug": "kiln-seasoning",
    "excerpt": "Kiln drying details...",
    "content": "Full post text...",
    "featured_image": "https://...",
    "author": "Atelier QC Head",
    "published_date": "2026-06-15"
  }
  ```

---

## Projects API

### Get All Projects
* **URL**: `/api/projects`
* **Method**: `GET`

### Create Project Case Study (Admin Only)
* **URL**: `/api/projects`
* **Method**: `POST`

---

## Inquiries API

### Submit Trade Inquiry (Public)
* **URL**: `/api/inquiries`
* **Method**: `POST`
* **Body**:
  ```json
  {
    "name": "Rajiv Mehta",
    "company_name": "Taj Hotels Group",
    "email": "r.mehta@tajhotels.com",
    "phone": "+91 98765 43210",
    "country": "India",
    "message": "Sourcing 24 dining chairs.",
    "inquiry_type": "B2B Trade"
  }
  ```

### Get All Inquiries (Admin Only)
* **URL**: `/api/inquiries`
* **Method**: `GET`

### Update Inquiry Status/Notes (Admin Only)
* **URL**: `/api/inquiries/:id`
* **Method**: `PUT`
* **Body**:
  ```json
  {
    "status": "Contacted",
    "notes": "Spoke on phone, scheduled details sample delivery."
  }
  ```
