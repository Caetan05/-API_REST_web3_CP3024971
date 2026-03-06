import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import produtoRoutes from "./routes/produto.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "produto-service" }));
app.use("/produtos", produtoRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Produto DB sincronizado!");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Produto Service rodando na porta ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar o Produto Service:", err.message);
    process.exit(1);
  }
})();
