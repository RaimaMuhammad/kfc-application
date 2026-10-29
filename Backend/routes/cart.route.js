const express = require("express");
const db = require("../Database/db");

const router = express.Router();

// GET /api/cart?user_id=1
router.get("/cart", (req, res) => {
  const userId = Number(req.query.user_id);

  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).json({
      message: "A valid user_id query parameter is required",
    });
  }

  const sql = `
    SELECT
      c.id AS cart_id,
      c.user_id,
      c.product_id,
      c.quantity,
      p.title,
      p.description,
      p.price,
      p.image,
      p.type
    FROM cart AS c
    JOIN products AS p ON p.id = c.product_id
    WHERE c.user_id = ?
    ORDER BY c.id
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Read cart error:", err);
      return res.status(500).json({ message: "Could not load cart" });
    }

    return res.json(rows);
  });
});

// POST /api/cart
router.post("/cart", (req, res) => {
  const userId = Number(req.body.user_id);
  const productId = Number(req.body.product_id);
  const quantity = Number(req.body.quantity ?? 1);

  if (
    !Number.isInteger(userId) || userId < 1 ||
    !Number.isInteger(productId) || productId < 1 ||
    !Number.isInteger(quantity) || quantity < 1
  ) {
    return res.status(400).json({
      message: "user_id, product_id, and a positive quantity are required",
    });
  }

  db.query(
    "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? LIMIT 1",
    [userId, productId],
    (findErr, rows) => {
      if (findErr) {
        console.error("Find cart item error:", findErr);
        return res.status(500).json({ message: "Could not add item to cart" });
      }

      if (rows.length > 0) {
        const cartItem = rows[0];
        const updatedQuantity = cartItem.quantity + quantity;

        return db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [updatedQuantity, cartItem.id],
          (updateErr) => {
            if (updateErr) {
              console.error("Update cart quantity error:", updateErr);
              return res.status(500).json({
                message: "Could not update cart quantity",
              });
            }

            return res.json({
              message: "Cart quantity increased",
              cart_id: cartItem.id,
              user_id: userId,
              product_id: productId,
              quantity: updatedQuantity,
            });
          }
        );
      }

      db.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity],
        (insertErr, result) => {
          if (insertErr?.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
              message: "That user_id or product_id does not exist",
            });
          }

          if (insertErr) {
            console.error("Create cart item error:", insertErr);
            return res.status(500).json({
              message: "Could not add item to cart",
            });
          }

          return res.status(201).json({
            message: "Product added to cart",
            cart_id: result.insertId,
            user_id: userId,
            product_id: productId,
            quantity,
          });
        }
      );
    }
  );
});

// PUT /api/cart/:userId/:productId
router.put("/cart/:userId/:productId", (req, res) => {
  const userId = Number(req.params.userId);
  const productId = Number(req.params.productId);
  const quantity = Number(req.body.quantity);

  if (
    !Number.isInteger(userId) || userId < 1 ||
    !Number.isInteger(productId) || productId < 1 ||
    !Number.isInteger(quantity) || quantity < 1
  ) {
    return res.status(400).json({
      message: "Valid IDs and a positive quantity are required",
    });
  }

  db.query(
    "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
    [quantity, userId, productId],
    (err, result) => {
      if (err) {
        console.error("Update cart error:", err);
        return res.status(500).json({ message: "Could not update cart item" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.json({
        message: "Cart quantity updated",
        user_id: userId,
        product_id: productId,
        quantity,
      });
    }
  );
});

// DELETE /api/cart/:userId/:productId
router.delete("/cart/:userId/:productId", (req, res) => {
  const userId = Number(req.params.userId);
  const productId = Number(req.params.productId);

  if (
    !Number.isInteger(userId) || userId < 1 ||
    !Number.isInteger(productId) || productId < 1
  ) {
    return res.status(400).json({
      message: "Valid user_id and product_id are required",
    });
  }

  db.query(
    "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err, result) => {
      if (err) {
        console.error("Delete cart item error:", err);
        return res.status(500).json({ message: "Could not remove cart item" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.json({ message: "Cart item removed" });
    }
  );
});

module.exports = router;