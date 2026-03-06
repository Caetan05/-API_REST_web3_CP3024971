
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pedido = sequelize.define("Pedido",{
 id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
 descricao:{type:DataTypes.STRING},
 valor:{type:DataTypes.FLOAT},
 clienteId:{type:DataTypes.INTEGER}
});

export default Pedido;
