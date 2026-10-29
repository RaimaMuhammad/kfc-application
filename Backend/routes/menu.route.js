const express = require("express");
const db = require("../Database/db");

const router = express.Router();

// GET /api/menu — read the menu; optional filters: ?type=Burger or ?search=chicken
router.get("/menu", (req, res) => {
  const conditions = [];
  const values = [];

  if (req.query.type) {
    conditions.push("LOWER(type) = LOWER(?)");
    values.push(req.query.type);
  }

  if (req.query.search) {
    conditions.push("(title LIKE ? OR description LIKE ? OR type LIKE ?)");
    const search = `%${req.query.search}%`;
    values.push(search, search, search);
  }

  const where = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  db.query(
    `SELECT * FROM products ${where} ORDER BY id`,
    values,
    (err, rows) => {
      if (err) {
        console.error("Read menu error:", err);
        return res.status(500).json({ message: "Could not load menu" });
      }

      return res.json(rows);
    }
  );
});

// GET /api/menu/:id — read one menu item
router.get("/menu/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.error("Read menu item error:", err);
        return res.status(500).json({ message: "Could not load menu item" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      return res.json(rows[0]);
    }
  );
});

// POST /api/menu — add a menu item
router.post("/menu", (req, res) => {
  const { title, description, price, image, type } = req.body;

  if (!title || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: "A title and non-negative price are required",
    });
  }

  db.query(
    `INSERT INTO products (title, description, price, image, type)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description || null, Number(price), image || null, type || null],
    (err, result) => {
      if (err) {
        console.error("Create menu item error:", err);
        return res.status(500).json({ message: "Could not create menu item" });
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

// PUT /api/menu/:id — update a menu item
router.put("/menu/:id", (req, res) => {
  const { title, description, price, image, type } = req.body;

  if (!title || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: "A title and non-negative price are required",
    });
  }

  db.query(
    `UPDATE products
     SET title = ?, description = ?, price = ?, image = ?, type = ?
     WHERE id = ?`,
    [title, description || null, Number(price), image || null, type || null, req.params.id],
    (err, result) => {
      if (err) {
        console.error("Update menu item error:", err);
        return res.status(500).json({ message: "Could not update menu item" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      return res.json({ message: "Menu item updated successfully" });
    }
  );
});

// DELETE /api/menu/:id — remove a menu item
router.delete("/menu/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err?.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          message: "This menu item is in a cart. Remove it from the cart first.",
        });
      }

      if (err) {
        console.error("Delete menu item error:", err);
        return res.status(500).json({ message: "Could not delete menu item" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      return res.json({ message: "Menu item deleted successfully" });
    }
  );
});

module.exports = router;