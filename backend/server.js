require("dotenv").config();   // load env variables

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({ origin: "*" }));
app.use(express.json());

/* ---------------- DB CONNECTION ---------------- */

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false
  },

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

/* Test DB connection */
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("❌ DB connection error:", err);
  });

/* ---------------- ROUTES ---------------- */

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
