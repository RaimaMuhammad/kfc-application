const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../Database/db");

const router = express.Router();

// SIGN UP: POST /api/register
router.post("/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            `INSERT INTO users (firstname, lastname, email, password)
             VALUES (?, ?, ?, ?)`,
            [firstname, lastname, email, hashedPassword],
            (err, result) => {
                if (err?.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ message: "Email already exists" });
                }

                if (err) {
                    console.error("Signup database error:", err);
                    return res.status(500).json({ message: "Could not create account" });
                }

                return res.status(201).json({
                    message: "Account created successfully",
                    userId: result.insertId,
                });
            }
        );
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Could not create account" });
    }
});

// LOG IN: POST /api/login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    db.query(
        "SELECT id, firstname, lastname, email, password FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.error("Login database error:", err);
                return res.status(500).json({ message: "Could not log in" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];
            let passwordMatches;

            try {
                if (user.password.startsWith("$2")) {
                    passwordMatches = await bcrypt.compare(password, user.password);
                } else {
                    // Lets accounts made before password hashing log in once.
                    passwordMatches = password === user.password;

                    if (passwordMatches) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        db.query(
                            "UPDATE users SET password = ? WHERE id = ?",
                            [hashedPassword, user.id],
                            (updateErr) => {
                                if (updateErr) console.error(updateErr);
                            }
                        );
                    }
                }
            } catch (passwordErr) {
                console.error("Password verification error:", passwordErr);
                return res.status(500).json({ message: "Could not log in" });
            }

            if (!passwordMatches) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            return res.json({
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                },
            });
        }
    );
});

module.exports = router;