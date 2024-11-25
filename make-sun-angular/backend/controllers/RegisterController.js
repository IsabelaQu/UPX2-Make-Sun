const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class RegisterController {
  // Método para cadastrar usuário
  static async register(req, res) {
    const { username, fullName, email, phone, password, address } = req.body;

    // Validações dos campos obrigatórios
    if (!username) {
      return res.status(422).json({ message: "O nome de usuário é obrigatório!" });
    }

    if (!fullName) {
      return res.status(422).json({ message: "O nome completo é obrigatório!" });
    }

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }

    // Verifica se o email já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Este email já está cadastrado!" });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria um novo usuário
    const user = new User({
      username,
      fullName,
      email,
      phone,
      password: hashedPassword,
      address: {
        cep: address?.cep || "",
        number: address?.number || "",
        complement: address?.complement || "",
      },
    });

    try {
      await user.save();
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao cadastrar o usuário!" });
    }
  }

  // Login do usuário
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida!" });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user._id }, secret);

      res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao realizar login!" });
    }
  }

  // Método para buscar usuário por ID
  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id, "-password");

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar usuário!" });
    }
  }
};
