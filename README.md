# 📦 Sistema de Gestão de Estoque

Sistema web desenvolvido para **gerenciamento de produtos e controle de estoque**, utilizando Node.js, Express, EJS e SQLite.

Este projeto está sendo desenvolvido como forma de **estudo e preparação para uma avaliação prática de desenvolvimento de sistema de gestão de estoque**.

---

## 🎯 Objetivo

Desenvolver um sistema que permita ao usuário:

- Cadastrar produtos;
- Visualizar produtos;
- Editar produtos;
- Excluir produtos;
- Realizar entradas e saídas de estoque;
- Controlar o estoque mínimo;
- Emitir alertas quando o estoque ficar abaixo do mínimo;
- Registrar as movimentações realizadas;
- Identificar o usuário responsável pelas operações.

---

## 🛠️ Tecnologias

- **Node.js**
- **Express**
- **EJS**
- **JavaScript**
- **HTML5**
- **CSS3**
- **SQLite**
- **better-sqlite3**
- **express-session**
- **Nodemon**
- **Git / GitHub**

---

## 📦 Dependências

```json
{
  "dependencies": {
    "better-sqlite3": "^13.0.3",
    "ejs": "^6.0.1",
    "express": "^5.2.1",
    "express-session": "^1.19.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

## 📁 Estrutura

```text
Sistema/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   └── login.html
│
├── views/
│   ├── editar.ejs
│   ├── principal.ejs
│   ├── produtos.ejs
│   └── estoque.ejs
│
├── almoxarifado_db.sql
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
└── README.md
```

---

# 🚀 Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/sizew/treino-prova-senai
```

### 2. Entrar na pasta

```bash
cd treino-prova-senani
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o servidor

```bash
node server.js
```

Ou utilizando o Nodemon:

```bash
npx nodemon server.js
```

### 5. Acessar

```text
http://localhost:3000/login.html
```

---

# ✅ Checklist do projeto

## 🗄️ Banco de dados

- [x] Criar banco `almoxarifado_db`
- [x] Criar tabelas
- [x] Definir chaves primárias
- [x] Definir chaves estrangeiras
- [x] Inserir pelo menos 3 registros por tabela
- [x] Criar script `almoxarifado_db.sql`
- [ ] Criar DER

## 🔐 Login

- [x] Criar tela de login
- [x] Validar usuário
- [x] Validar senha
- [x] Exibir mensagem em caso de erro
- [x] Criar sessão
- [x] Implementar logout

## 🏠 Interface principal

- [x] Exibir nome do usuário logado
- [x] Botão de logout
- [x] Acesso ao cadastro de produtos
- [x] Acesso à gestão de estoque

## 📦 Cadastro de produtos

- [x] Listar produtos
- [ ] Criar busca
- [x] Cadastrar produto
- [x] Editar produto
- [x] Excluir produto
- [x] Validar campos
- [x] Exibir alertas de validação
- [x] Voltar para a interface principal

## 📊 Gestão de estoque

- [x] Listar produtos
- [x] Ordenar produtos alfabeticamente
- [x] Selecionar produto
- [x] Criar entrada de estoque
- [x] Criar saída de estoque
- [x] Informar data da movimentação
- [x] Atualizar quantidade do estoque
- [x] Definir estoque mínimo
- [x] Alertar estoque abaixo do mínimo
- [x] Registrar histórico das movimentações
- [x] Registrar usuário responsável

## 🧪 Testes

- [ ] Criar casos de teste
- [ ] Testar login
- [ ] Testar cadastro
- [ ] Testar edição
- [ ] Testar exclusão
- [ ] Testar busca
- [ ] Testar entrada de estoque
- [ ] Testar saída de estoque
- [ ] Testar alerta de estoque mínimo
- [ ] Documentar ferramentas e ambiente de teste

## 💻 Infraestrutura

- [ ] Informar SGBD e versão
- [ ] Informar linguagem e versão
- [ ] Informar sistema operacional e versão

## 📄 Documentação

- [ ] Requisitos funcionais
- [ ] DER
- [x] Script SQL
- [ ] Casos de teste
- [ ] Requisitos de infraestrutura
- [x] README.md

---

# 📋 Entregas da avaliação

| Nº | Entrega | Status |
|---|---|---|
| 1 | Requisitos funcionais | 🚧 |
| 2 | Diagrama Entidade-Relacionamento (DER) | 🚧 |
| 3 | Script de criação e população do banco | ✅ |
| 4 | Interface de autenticação | ✅ |
| 5 | Interface principal | ✅ |
| 6 | Interface de cadastro de produto | 🚧 (Falta Campo de Busca) |
| 7 | Interface de gestão de estoque | ✅ |
| 8 | Casos de teste de software | 🚧 |
| 9 | Requisitos de infraestrutura | 🚧 |

---

# 📌 Status

🚧 **Em desenvolvimento**

Projeto criado para **estudo, prática e preparação para avaliação**.

---

## 👨‍💻 FEITO POR MIM MESMO

> Transformando estudo em prática. 🚀
