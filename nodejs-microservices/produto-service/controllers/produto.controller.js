import Produto from "../models/Produto.js";

export const createProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    return res.status(201).json(produto);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    return res.json(produto);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    await produto.update(req.body);
    return res.json(produto);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    await produto.destroy();
    return res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
