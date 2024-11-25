const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/register", async (req, res) => {
  const { username, fullName, email, phone, password, address } = req.body;


  if (!username || !email || !password) {
    return res.status(422).json({ message: "Campos obrigatórios ausentes!" });
  }

  try {
    // Criação do novo usuário
    const newUser = new User({
      username,
      fullName,
      email,
      phone,
      password, 
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro ao registrar usuário!" });
  }
});

module.exports = router;
