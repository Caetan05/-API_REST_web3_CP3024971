import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import clienteRoutes from "./routes/cliente.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "cliente-service" }));
app.use("/clientes", clienteRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Cliente DB sincronizado!");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Cliente Service rodando na porta ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar o Cliente Service:", err.message);
    process.exit(1);
  }
})();
