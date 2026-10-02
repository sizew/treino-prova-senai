const express = require("express");
const session = require("express-session");
const fs = require("fs");
const Database = require('better-sqlite3');
const { render } = require("ejs");
const db = new Database('almoxarifado.db');

const bancoPronto = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'").get();

if (!bancoPronto) {

  console.log("Primeira vez rodando... Criando o banco de dados!");
  const scriptSql = fs.readFileSync('almoxarifado_db.sql', 'utf8');
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

  res.render('editar', { produto: EditarProdutos });
});

app.post('/produtos/atualizar', (req, res) => {
  const nomeDigitado = req.body.nome;
  const descricaoDigitada = req.body.descricao;
  const quantidade_atualDigitada = req.body.quantidade_atual;
  const estoque_minimoDigitado = req.body.estoque_minimo;
  const id = req.body.id;

  const comandoSql = 'UPDATE produtos SET nome = ?, descricao = ?, quantidade_atual = ?, estoque_minimo = ? WHERE id = ?'

  db.prepare(comandoSql).run(nomeDigitado, descricaoDigitada, quantidade_atualDigitada, estoque_minimoDigitado, id);

  res.redirect('/produtos')

});

app.get('/estoque', (req, res) => {

  if (!req.session.usuarioLogado) {
    return res.redirect('/login.html');
  }
  const comandoSql = 'SELECT * FROM produtos ORDER BY nome ASC';
  const produtosOrdenados = db.prepare(comandoSql).all();

  res.render('estoque', { produtos: produtosOrdenados });
});

app.post('/estoque/movimentar', (req, res) => {
  const produto_id = req.body.produto_id;
  const tipo_movimentacao = req.body.tipo_movimentacao;
  const quantidade = req.body.quantidade;
  const data_operacao = req.body.data_operacao;

  const nomeDoUsuario = req.session.usuarioLogado;
  const usuarioEncontrado = db.prepare('SELECT * FROM usuarios WHERE nome = ?').get(nomeDoUsuario);
  const usuarioId = usuarioEncontrado.id;

  const gravarMovi = 'INSERT INTO movimentacoes (produto_id, usuario_id, tipo_movimentacao, quantidade, data_operacao) VALUES (?, ?, ?, ?, ?)';
  db.prepare(gravarMovi).run(produto_id, usuarioId, tipo_movimentacao, quantidade, data_operacao);

  if (tipo_movimentacao === 'entrada') {
    const sqlSoma = 'UPDATE produtos SET quantidade_atual = quantidade_atual + ? WHERE id = ?';
    db.prepare(sqlSoma).run(quantidade, produto_id);
  } else {
    // 1. Faz a subtração normal
    const sqlSubtrai = 'UPDATE produtos SET quantidade_atual = quantidade_atual - ? WHERE id = ?';
    db.prepare(sqlSubtrai).run(quantidade, produto_id);

    // 2. Busca como o produto ficou depois da subtração
    const produtoAtualizado = db.prepare('SELECT nome, quantidade_atual, estoque_minimo FROM produtos WHERE id = ?').get(produto_id);

    // 3. Verifica se a quantidade ficou abaixo do mínimo
    if (produtoAtualizado.quantidade_atual < produtoAtualizado.estoque_minimo) {
      // Manda um alerta de erro na tela e depois redireciona
      return res.send(`
        <script>
          alert("ALERTA CRÍTICO: O produto '${produtoAtualizado.nome}' está abaixo do estoque mínimo!");
          window.location.href = "/estoque";
        </script>
      `);
    }
  }

  // Volta para a tela de estoque (se for entrada ou se não deu alerta)
  res.redirect('/estoque');
});


app.listen(PORT, () => {
  console.log(`Servidor está online em http://localhost:${PORT}/login.html`);
}); 
