const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("usuarios/add");
});

router.post("/add", async (req, res) => {
  const { username, password, nombre_completo } = req.body;
  const newUsuario = {
    username,
    password,
    nombre_completo
  };
  await pool.query("INSERT INTO usuarios SET ?", [newUsuario]);
  res.send("recived");
});

router.get("/", async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM usuarios");
  console.log(usuarios);
  res.render("usuarios/list", { usuarios });
});

module.exports = router;
