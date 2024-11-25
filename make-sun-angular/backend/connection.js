const mongoose = require("mongoose");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Função para conectar ao MongoDB
async function connectDB() {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@nosql.22s6x.mongodb.net/?retryWrites=true&w=majority&appName=NoSQL`;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Conectado ao MongoDB");
    } catch (err) {
        console.error("Erro na conexão com o MongoDB:", err);
        throw err;
    }
}

module.exports = connectDB;
