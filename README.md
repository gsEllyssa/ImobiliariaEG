# 🏠 Sistema de Gestão para Imobiliária

Bem-vindo ao projeto do Sistema de Gestão da Imobiliária! Este documento contém tudo que você precisa para configurar e rodar o projeto na sua máquina.

## ✅ Pré-requisitos

Antes de começar, garanta que você tenha os seguintes programas instalados:

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Yarn](https://yarnpkg.com/getting-started/install) (gerenciador de pacotes que estamos usando)
* [MongoDB](https://www.mongodb.com/try/download/community) (instalado localmente ou uma conta no MongoDB Atlas)
* [Git](https://git-scm.com/)

---

## 🚀 Como Rodar o Projeto (Modo Fácil)

Com a estrutura de Workspaces, o processo ficou muito mais simples.

### 1. Clone o Repositório
Abra seu terminal, navegue até a pasta onde guarda seus projetos e rode o comando:
```bash
git clone [https://github.com/SEU-USUARIO/imobiliaria.git](https://github.com/SEU-USUARIO/imobiliaria.git)
cd imobiliaria
```

### 2. Instale TODAS as Dependências
Com o Yarn Workspaces, você só precisa rodar um comando na pasta raiz do projeto. Ele instalará tudo para o back-end e para o front-end de uma vez só.
```bash
yarn install
```

### 3. Configure as Variáveis de Ambiente
Você precisará criar dois arquivos `.env`, um para o back-end e outro para o front-end.

**A) Para o Back-end:**
Crie um arquivo chamado `.env` **dentro da pasta `backend`** com o seguinte conteúdo:
```env
# URL de conexão com o MongoDB
MONGO_URI=mongodb://localhost:27017/imobiliaria

# Chave secreta para gerar os tokens de autenticação
JWT_SECRET=coloque-uma-frase-secreta-bem-longa-aqui

# Porta onde o servidor back-end vai rodar
PORT=5050
```

**B) Para o Front-end:**
Crie um arquivo chamado `.env` **dentro da pasta `frontend`** com o seguinte conteúdo:
```env
# Endereço da API que o front-end vai consumir
VITE_API_URL=http://localhost:5050
```

### 4. Inicie o Projeto Inteiro!
Graças ao `concurrently`, você pode iniciar o back-end e o front-end com um único comando a partir da **pasta raiz `imobiliaria`**:
```bash
yarn dev
```
Isso iniciará os dois servidores ao mesmo tempo, no mesmo terminal. O back-end estará rodando em `http://localhost:5050` e o front-end em `http://localhost:5173`.

---

## 🔁 Fluxo de Trabalho com Git (Workflow)

Para evitarmos conflitos e trabalharmos de forma organizada, vamos seguir um fluxo simples com branches.

### ☀️ Para Começar uma Nova Tarefa:
1.  Garanta que sua branch `main` está atualizada:
    ```bash
    git switch main
    git pull origin main
    ```
2.  Crie uma nova branch para a sua tarefa:
    ```bash
    git switch -c seu-nome/descricao-da-tarefa
    ```
    *Exemplo: `git switch -c yara/tela-de-login`*

### 🌙 Ao Terminar seu Trabalho na Tarefa:
1.  Adicione e salve suas alterações:
    ```bash
    git add .
    git commit -m "O que você fez (ex: feat: cria formulário de login)"
    ```
2.  Envie sua branch para o GitHub:
    ```bash
    git push origin seu-nome/descricao-da-tarefa
    ```
3.  **Abra um Pull Request (PR) no GitHub:** Vá até a página do repositório no GitHub, e você verá um aviso para criar um "Pull Request". Crie o PR para que os outros possam revisar seu código antes de uni-lo à branch `main`.

---

## 👨‍💻 Tecnologias Utilizadas

* **Front-end:** React, Vite, Tailwind CSS
* **Back-end:** Node.js, Express
* **Banco de Dados:** MongoDB com Mongoose
* **Autenticação:** JWT (JSON Web Tokens)
* **Gerenciamento do Projeto:** Yarn Workspaces, Concurrently

Feito com 💙 para o projeto da Imobiliária.