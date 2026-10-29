const express = require("express");
const db = require("../Database/db");

const router = express.Router();

// GET /api/products — read all products
router.get("/products", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Read products error:", err);
      return res.status(500).json({ message: "Could not load products" });
    }

    return res.json(rows);
  });
});

// GET /api/products/:id — read one product
router.get("/products/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.error("Read product error:", err);
        return res.status(500).json({ message: "Could not load product" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json(rows[0]);
    }
  );
});

// POST /api/products — create a product
router.post("/products", (req, res) => {
  const { title, description, price, image, type } = req.body;

  if (!title || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: "A title and non-negative price are required",
    });
  }

  const sql = `
    INSERT INTO products (title, description, price, image, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description || null, Number(price), image || null, type || null],
    (err, result) => {
      if (err) {
        console.error("Create product error:", err);
        return res.status(500).json({ message: "Could not create product" });
      }

      return res.status(201).json({
        id: result.insertId,
        title,
        description: description || null,
        price: Number(price),
        image: image || null,
        type: type || null,
      });
    }
  );
});

// PUT /api/products/:id — update a product
router.put("/products/:id", (req, res) => {
  const { title, description, price, image, type } = req.body;

  if (!title || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: "A title and non-negative price are required",
    });
  }

  const sql = `
    UPDATE products
    SET title = ?, description = ?, price = ?, image = ?, type = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, description || null, Number(price), image || null, type || null, req.params.id],
    (err, result) => {
      if (err) {
        console.error("Update product error:", err);
        return res.status(500).json({ message: "Could not update product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Product updated successfully" });
    }
  );
});

// DELETE /api/products/:id — delete a product
router.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err?.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          message: "This product is in a cart. Remove it from the cart first.",
        });
      }

      if (err) {
        console.error("Delete product error:", err);
        return res.status(500).json({ message: "Could not delete product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Product deleted successfully" });
    }
  );
});

module.exports = router;