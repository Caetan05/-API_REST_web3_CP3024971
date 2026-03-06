import Cliente from "../models/Cliente.js";

export const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    return res.status(201).json(cliente);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    return res.json(cliente);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    await cliente.update(req.body);
    return res.json(cliente);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    await cliente.destroy();
    return res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
