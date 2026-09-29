-- TABELA DE USUÁRIOS E DADOS INICIAIS
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

INSERT INTO usuarios (nome, login, senha) VALUES 
('João Almoxarife', 'joao@empresa.com', 'senha123'),
('Maria Admin', 'maria@empresa.com', 'senha123'),
('Carlos Operador', 'carlos@empresa.com', 'senha123');


-- TABELA DE PRODUTOS E DADOS INICIAIS
CREATE TABLE produtos ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    quantidade_atual INTEGER NOT NULL DEFAULT 0,
    estoque_minimo INTEGER NOT NULL DEFAULT 0
);

INSERT INTO produtos (nome, descricao, quantidade_atual, estoque_minimo) VALUES 
('Caixa de Papelão Média', '50x50x40cm, Gramatura 300g', 100, 10),
('Frasco Plástico PET', 'Capacidade: 500ml, Tampa de rosca branca', 100, 10),
('Caixa de Papelão Pequena', '20x20x15cm, Gramatura 200g', 100, 10);


-- TABELA DE MOVIMENTAÇÕES
CREATE TABLE movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER,
    usuario_id INTEGER,
    tipo_movimentacao TEXT,
    quantidade INTEGER NOT NULL DEFAULT 0,
    data_operacao DATETIME,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO movimentacoes (produto_id, usuario_id, tipo_movimentacao, quantidade, data_operacao) VALUES 
( 1, 1, 'entrada', 30, CURRENT_TIMESTAMP),
( 2, 2, 'saida', 40, CURRENT_TIMESTAMP),
( 3, 3, 'saida', 50, CURRENT_TIMESTAMP);