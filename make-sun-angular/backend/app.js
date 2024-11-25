const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/registerRoutes");

require("dotenv").config();
const connectDB = require("./connection");

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta: ${port}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });

// Rotas
app.use("/api/users", userRoutes);