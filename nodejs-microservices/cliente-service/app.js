
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import clienteRoutes from "./routes/cliente.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/clientes",clienteRoutes);

(async ()=>{
 await sequelize.authenticate();
 await sequelize.sync();
 app.listen(process.env.PORT,()=>{
   console.log("Cliente service rodando");
 });
})();
