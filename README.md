# Node.js Microservices (Clientes, Produtos, Pedidos)

Este projeto contém 3 microserviços independentes (cada um com seu próprio banco):
- cliente-service (porta 3001) -> CRUD de clientes
- produto-service (porta 3003) -> CRUD de produtos
- pedido-service (porta 3002) -> CRUD de pedidos

## Bancos MySQL
Crie os bancos:
```sql
CREATE DATABASE cliente_db;
CREATE DATABASE produto_db;
CREATE DATABASE pedido_db;
```

## Como rodar
Em 3 terminais, um para cada serviço:

### Cliente
```bash
cd cliente-service
npm install
npm start
```

### Produto
```bash
cd produto-service
npm install
npm start
```

### Pedido
```bash
cd pedido-service
npm install
npm start
```

Ajuste as senhas no `.env` de cada serviço.

## Teste rápido (exemplos)

### Criar um cliente
POST http://localhost:3001/clientes
```json
{ "nome": "João", "email": "joao@email.com" }
```

### Criar produtos
POST http://localhost:3003/produtos
```json
{ "nome": "Notebook", "preco": 3500 }
```

POST http://localhost:3003/produtos
```json
{ "nome": "Mouse", "preco": 120 }
```

### Criar um pedido (valida cliente e produtos via HTTP)
POST http://localhost:3002/pedidos
```json
{ "clienteId": 1, "produtos": [1, 2] }
```
O `pedido-service` valida o cliente no `cliente-service` e valida cada produto no `produto-service`.
Ele também calcula `valorTotal` somando o preço dos produtos.
