const express = require("express");
const session = require("express-session");
const fs = require("fs");
const Database = require('better-sqlite3');
const { render } = require("ejs");
const db = new Database('almoxarifado.db');

const bancoPronto = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'").get();

if (!bancoPronto) {
  // Se não existir, ele lê o seu arquivo .sql da Fase 1 e cria tudo!
  console.log("Primeira vez rodando... Criando o banco de dados!");
  const scriptSql = fs.readFileSync('almoxarifado_db.sql', 'utf8'); // Coloque o nome exato do seu arquivo .sql aqui
  db.exec(scriptSql);
}

const app = express();

const PORT = 3000;

app.use(
  session({
    secret: "senha_secreta_prova",
    resave: false,
    saveUninitialized: false,
  }),
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/login", (req, res) => {
  const emailDigitado = req.body.email;
  const senhaDigitada = req.body.senha;



  const comandoSql = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  const usuarioEncontrado = db.prepare(comandoSql).get(emailDigitado, senhaDigitada);

  if (usuarioEncontrado) {
    req.session.usuarioLogado = usuarioEncontrado.nome;
    res.redirect('/principal');
  }

});


app.get('/principal', (req, res) => {
  if (!req.session.usuarioLogado) {
    return res.redirect('/login.html');
  }
  res.render('principal', { nomeDoUsuario: req.session.usuarioLogado });
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});


app.get('/produtos', (req, res) => {
  if (!req.session.usuarioLogado) {
    return res.redirect('/login.html');
  }
  const todosOsProdutos = db.prepare('SELECT * FROM produtos').all();

  res.render('produtos', { produtos: todosOsProdutos });
});

app.post('/produtos/salvar', (req, res) => {
  const nomeDigitado = req.body.nome;
  const descricaoDigitada = req.body.descricao;
  const quantidade_atualDigitada = req.body.quantidade_atual;
  const estoque_minimoDigitado = req.body.estoque_minimo;

  const comandoSql = 'INSERT INTO produtos (nome, descricao, quantidade_atual, estoque_minimo) VALUES (?, ?, ?, ?)';

  db.prepare(comandoSql).run(nomeDigitado, descricaoDigitada, quantidade_atualDigitada, estoque_minimoDigitado);

  res.redirect('/produtos')

});

app.post('/produtos/excluir', (req, res) => {
  const id = req.body.id;

  const comandoSql = 'DELETE FROM produtos WHERE id = ?'
  const deleteSql = 'DELETE FROM movimentacoes WHERE produto_id = ?'


  db.prepare(deleteSql).run(id);
  db.prepare(comandoSql).run(id);


  res.redirect('/produtos')
});


app.get('/produtos/editar', (req, res) => {
  const id = req.query.id;

  const EditarProdutos = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);

  res.render('editar', {produto: EditarProdutos });
});

  app.post('/produtos/atualizar', (req,res) => {
    const nomeDigitado = req.body.nome;
    const descricaoDigitada = req.body.descricao;
    const quantidade_atualDigitada = req.body.quantidade_atual;
    const estoque_minimoDigitado = req.body.estoque_minimo;
    const id = req.body.id;

    const comandoSql = 'UPDATE produtos SET nome = ?, descricao = ?, quantidade_atual = ?, estoque_minimo = ? WHERE id = ?'

    db.prepare(comandoSql).run(nomeDigitado, descricaoDigitada, quantidade_atualDigitada, estoque_minimoDigitado, id);

    res.redirect('/produtos')

  });

app.listen(PORT, () => {
  console.log(`Servidor está online em http://localhost:${PORT}/login.html`);
});
