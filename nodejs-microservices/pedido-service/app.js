
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import pedidoRoutes from "./routes/pedido.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/pedidos",pedidoRoutes);

(async ()=>{
 await sequelize.authenticate();
 await sequelize.sync();
 app.listen(process.env.PORT,()=>{
   console.log("Pedido service rodando");
 });
})();
