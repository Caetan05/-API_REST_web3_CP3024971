import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/**
 * Armazenamos "produtos" como JSON em um campo TEXT (para compatibilidade).
 * Exemplo: [1,2,3]
 */
const Pedido = sequelize.define(
  "Pedido",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clienteId: { type: DataTypes.INTEGER, allowNull: false },

    // lista de ids de produtos (JSON string)
    produtos: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("produtos");
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(value) {
        this.setDataValue("produtos", JSON.stringify(value ?? []));
      }
    },

    // opcional: total calculado a partir do preço dos produtos
    valorTotal: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 }
  },
  { timestamps: true }
);

export default Pedido;
