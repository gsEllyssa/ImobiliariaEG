

---

````markdown
# 🏠 Sistema Imobiliária

Este é o sistema de gerenciamento de uma imobiliária familiar, desenvolvido em Node.js + MongoDB no backend e React no frontend. Aqui está um guia **simples e direto** para quem for programar no projeto.

---

## ✅ O que você precisa ter instalado

- [Node.js](https://nodejs.org/) (v18 ou mais recente)
- [MongoDB](https://www.mongodb.com/try/download/community) (pode ser local ou Atlas)
- [Git](https://git-scm.com/)
- Um editor como [VS Code](https://code.visualstudio.com/)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/imobiliaria.git
cd imobiliaria
````

### 2. Instalar as dependências

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configurar o arquivo `.env` no backend

Crie um arquivo chamado `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/imobiliaria
JWT_SECRET=sua-chave-super-secreta
```

> Substitua o `JWT_SECRET` por qualquer texto seguro.

### 4. (Opcional) Popular o banco com dados de exemplo

```bash
cd backend
node seed.js
```

### 5. Iniciar o backend

```bash
cd backend
npm run dev
```

### 6. Iniciar o frontend

```bash
cd frontend
npm run dev
```

---

## 🔁 Comandos Git (sem branches)

### ☀️ Para começar o dia:

```bash
git pull
```

> Isso garante que você tenha o código mais recente.

---

### 🌙 Ao terminar seu trabalho:

```bash
git add .
git commit -m "Descreva o que você fez"
git push
```

> Isso envia suas alterações para o GitHub.

---

## 📌 Dicas rápidas

* O backend roda em: `http://localhost:5050`
* O frontend roda em: `http://localhost:5173`
* Use dois terminais separados para rodar backend e frontend
* O token de login é salvo automaticamente no `localStorage`

---

## 👨‍💻 Tecnologias usadas

* React
* Node.js (Express)
* MongoDB
* Mongoose
* JWT para autenticação
* SCSS (estilo visual)
* Axios para requisições HTTP

---

Feito com 💙 para o projeto da Imobiliária.

```
