
import Cliente from "../models/Cliente.js";

export const createCliente = async (req,res)=>{
  const cliente = await Cliente.create(req.body);
  res.json(cliente);
};

export const getClientes = async (req,res)=>{
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

export const getClienteById = async (req,res)=>{
  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
};

export const updateCliente = async (req,res)=>{
  const cliente = await Cliente.findByPk(req.params.id);
  await cliente.update(req.body);
  res.json(cliente);
};

export const deleteCliente = async (req,res)=>{
  const cliente = await Cliente.findByPk(req.params.id);
  await cliente.destroy();
  res.json({message:"Cliente deletado"});
};
