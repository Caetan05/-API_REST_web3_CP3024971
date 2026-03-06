import Pedido from "../models/Pedido.js";

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) return { ok: false, status: res.status };
  const data = await res.json().catch(() => null);
  return { ok: true, data };
};

const validarCliente = async (clienteId) => {
  const url = `${process.env.CLIENTE_SERVICE_URL}/${clienteId}`;
  const r = await fetchJson(url);
  if (!r.ok) throw new Error("Cliente não encontrado");
  return r.data;
};

const validarProdutosECalcularTotal = async (produtoIds) => {
  if (!Array.isArray(produtoIds) || produtoIds.length === 0) {
    throw new Error("Informe uma lista de produtos (ex.: produtos: [1,2])");
  }

  // remove duplicados e valida se são números/strings numéricas
  const ids = [...new Set(produtoIds)].map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0);
  if (ids.length === 0) throw new Error("Lista de produtos inválida");

  let total = 0;
  const produtosDetalhes = [];

  for (const id of ids) {
    const url = `${process.env.PRODUTO_SERVICE_URL}/${id}`;
    const r = await fetchJson(url);
    if (!r.ok) throw new Error(`Produto não encontrado: ${id}`);
    const produto = r.data;
    produtosDetalhes.push(produto);
    total += Number(produto.preco ?? 0);
  }

  return { ids, total, produtosDetalhes };
};

export const createPedido = async (req, res) => {
  try {
    const { clienteId, produtos } = req.body;

    await validarCliente(clienteId);
    const { ids, total } = await validarProdutosECalcularTotal(produtos);

    const pedido = await Pedido.create({
      clienteId,
      produtos: ids,
      valorTotal: total
    });

    return res.status(201).json(pedido);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    return res.json(pedidos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    return res.json(pedido);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

    // se trocar cliente, valida
    if (req.body.clienteId && req.body.clienteId !== pedido.clienteId) {
      await validarCliente(req.body.clienteId);
    }

    // se trocar produtos, valida e recalcula
    if (req.body.produtos) {
      const { ids, total } = await validarProdutosECalcularTotal(req.body.produtos);
      req.body.produtos = ids;
      req.body.valorTotal = total;
    }

    await pedido.update(req.body);
    return res.json(pedido);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    await pedido.destroy();
    return res.json({ message: "Pedido deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
