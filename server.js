const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let produtos = [
  { id: 1, nome: 'Arroz 5kg', quantidade: 10, preco: 25.50 },
  { id: 2, nome: 'Feijão 1kg', quantidade: 20, preco: 8.90 }
];


app.get('/api/produtos', (req, res) => {
  res.status(200).json(produtos);
});


app.post('/api/produtos', (req, res) => {
  const novoProduto = {
    id: Date.now(),
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    preco: req.body.preco
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});


app.put('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

  produtos[index] = { ...produtos[index], ...req.body };
  res.status(200).json(produtos[index]);
});


app.delete('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

  produtos.splice(index, 1);
  res.status(204).send(); 
});

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});