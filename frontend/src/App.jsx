import { use, useState, Suspense } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/api/produtos';

const fetchProdutos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
};

// Componente da Tabela (Mantido igual)
function ListaProdutos({ produtosPromise, onEdit, onDelete }) {
  const produtos = use(produtosPromise);

  if (produtos.length === 0) return <p style={{textAlign: 'center'}}>Nenhum produto em estoque.</p>;

  return (
    <table className="tabela-produtos">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Qtd</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.nome}</td>
            <td>{produto.quantidade}</td>
            <td>R$ {produto.preco.toFixed(2)}</td>
            <td>
              <button onClick={() => onEdit(produto)}>Editar</button>
              <button onClick={() => onDelete(produto.id)} className="btn-delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// NOVO: Componente de Tela de Login
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação simples (hardcoded para o projeto)
    if (username === 'admin' && password === '1234') {
      onLogin();
    } else {
      setErro('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="container login-container">
      <h1>Acesso Restrito</h1>
      <form onSubmit={handleSubmit} className="form-login">
        <input 
          type="text" 
          placeholder="Usuário (dica: admin)" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha (dica: 1234)" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        {erro && <p className="msg-erro">{erro}</p>}
        <button type="submit">Entrar no Sistema</button>
      </form>
    </div>
  );
}

// Componente Principal
export default function App() {
  // NOVO: Estado para controlar se está logado ou não
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [produtosPromise, setProdutosPromise] = useState(() => fetchProdutos());
  const [form, setForm] = useState({ id: null, nome: '', quantidade: '', preco: '' });

  const recarregarProdutos = () => setProdutosPromise(fetchProdutos());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        quantidade: Number(form.quantidade),
        preco: Number(form.preco)
      })
    });

    setForm({ id: null, nome: '', quantidade: '', preco: '' });
    recarregarProdutos();
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      recarregarProdutos();
    }
  };

  const handleEdit = (produto) => {
    setForm(produto);
  };

 
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

 
  return (
    <div className="container">
      <div className="header-estoque">
        <h1>Gerenciador de Estoque</h1>
        <button onClick={() => setIsAuthenticated(false)} className="btn-sair">Sair</button>
      </div>
      
      <form onSubmit={handleSubmit} className="form-produto">
        <input 
          type="text" 
          placeholder="Nome do produto" 
          value={form.nome} 
          onChange={e => setForm({...form, nome: e.target.value})} 
          required 
        />
        <input 
          type="number" 
          placeholder="Quantidade" 
          value={form.quantidade} 
          onChange={e => setForm({...form, quantidade: e.target.value})} 
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Preço (R$)" 
          value={form.preco} 
          onChange={e => setForm({...form, preco: e.target.value})} 
          required 
        />
        <button type="submit">{form.id ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <hr />

      <Suspense fallback={<p style={{textAlign: 'center'}}>Carregando estoque...</p>}>
        <ListaProdutos 
          produtosPromise={produtosPromise} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </Suspense>
    </div>
  );
}