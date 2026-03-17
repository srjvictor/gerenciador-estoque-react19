# 📦 Gerenciador de Estoque (Full-Stack)

Uma aplicação web completa (Full-Stack) desenvolvida para facilitar o controle de mercadorias de pequenos comerciantes locais, como os da comunidade de Paraisópolis. O sistema oferece uma interface moderna, responsiva e intuitiva para o gerenciamento de produtos.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído separando o Back-end e o Front-end, cumprindo os requisitos de uma arquitetura RESTful moderna.

### Front-end
* **React 19:** Utilizando as mais novas features da biblioteca, incluindo o hook `use` integrado ao componente `<Suspense>` para resolução de Promises de forma nativa.
* **CSS3 Avançado:** Interface estilizada com técnicas de *Glassmorphism* (efeito vidro), gradientes animados em CSS puro e responsividade via Media Queries.
* **Vite:** Ferramenta de build super rápida para o ambiente de desenvolvimento.

### Back-end (API RESTful)
* **Node.js + Express:** Servidor leve e rápido para lidar com as requisições HTTP.
* **CORS:** Configurado para permitir a comunicação segura entre o front-end e a API local.
* **Memória Local:** Banco de dados em memória (arrays) para facilitar os testes e validações do CRUD.

---

## ✨ Funcionalidades (CRUD Completo)

A aplicação atende aos 4 verbos HTTP fundamentais de uma API REST:
1. **Create (POST):** Adicionar novos produtos informando nome, quantidade e preço.
2. **Read (GET):** Listar todos os produtos disponíveis em tempo real.
3. **Update (PUT):** Editar e atualizar as informações de um produto existente.
4. **Delete (DELETE):** Remover permanentemente um produto do estoque.

**Recurso Extra:**
* **Autenticação Simples:** Tela de login para proteger o acesso ao painel de estoque.
  * *Usuário para teste:* `admin`
  * *Senha para teste:* `1234`

---

## 📚 Documentação da API

A API roda localmente na porta `3001` e expõe o recurso `/api/produtos`.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/produtos` | Retorna um JSON com a lista de todos os produtos cadastrados. |
| `POST` | `/api/produtos` | Cria um novo produto. Requer `nome`, `quantidade` e `preco` no body (JSON). Retorna `201 Created`. |
| `PUT` | `/api/produtos/:id` | Atualiza um produto específico pelo ID. Retorna `200 OK`. |
| `DELETE`| `/api/produtos/:id` | Deleta o produto correspondente ao ID. Retorna `204 No Content`. |

---

## ⚙️ Como executar o projeto localmente

Como o projeto é dividido em duas partes, você precisará abrir dois terminais.

### 1. Rodando a API (Back-end)
Navegue até a pasta `backend` e rode os comandos:
\`\`\`bash
cd backend
npm install
node server.js
\`\`\`
A API ficará disponível em `http://localhost:3001`.

### 2. Rodando a Interface (Front-end)
Em um novo terminal, navegue até a pasta `frontend` e rode os comandos:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Acesse o link gerado pelo Vite (geralmente `http://localhost:5173`) no seu navegador.
