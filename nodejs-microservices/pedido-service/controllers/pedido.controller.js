
import Pedido from "../models/Pedido.js";

const validarCliente = async (clienteId)=>{
 const res = await fetch(process.env.CLIENTE_SERVICE_URL+"/"+clienteId);
 if(!res.ok){
   throw new Error("Cliente não encontrado");
 }
};

export const createPedido = async(req,res)=>{
 try{
  await validarCliente(req.body.clienteId);
  const pedido = await Pedido.create(req.body);
  res.json(pedido);
 }catch(e){
  res.status(400).json({error:e.message});
 }
};

export const getPedidos = async(req,res)=>{
 const pedidos = await Pedido.findAll();
 res.json(pedidos);
};

export const getPedidoById = async(req,res)=>{
 const pedido = await Pedido.findByPk(req.params.id);
 res.json(pedido);
};

export const updatePedido = async(req,res)=>{
 const pedido = await Pedido.findByPk(req.params.id);
 await pedido.update(req.body);
 res.json(pedido);
};

export const deletePedido = async(req,res)=>{
 const pedido = await Pedido.findByPk(req.params.id);
 await pedido.destroy();
 res.json({message:"Pedido deletado"});
};
