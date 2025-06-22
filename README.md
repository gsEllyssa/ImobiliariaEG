
```markdown
# 🏠 Imobiliária — Sistema de Gestão

Este é um sistema completo de gestão para imobiliária, desenvolvido em **React + Node.js + MongoDB**. Ele permite o cadastro e gerenciamento de inquilinos, contratos, imóveis, pagamentos e recibos.

---

## 🚀 Como Rodar o Projeto

### ✅ Pré-requisitos

Antes de começar, instale em sua máquina:

- [Node.js (v18 ou superior)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [MongoDB Compass (opcional)](https://www.mongodb.com/products/compass) para visualizar os dados.

---

## 🧭 Estrutura de Pastas

```

imobiliaria/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── vite.config.js
│
├── start-dev.sh
└── README.md

````

---

## ⚙️ Passo a Passo

### 1. Clone o Projeto

```bash
git clone https://github.com/seu-usuario/imobiliaria.git
cd imobiliaria
````

### 2. Instale as Dependências

#### Backend:

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/imobiliaria
PORT=5000
```

#### Frontend:

```bash
cd ../frontend
npm install
```

---

### 3. Rodar o Projeto Automaticamente (usando script)

Na raiz do projeto:

```bash
./start-dev.sh
```

Esse script abrirá dois terminais: um para o backend e outro para o frontend.

---

### 4. Acessar no Navegador

Frontend disponível em:

```
http://localhost:5173
```

