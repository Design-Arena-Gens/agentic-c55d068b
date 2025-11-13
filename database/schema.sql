-- ERP Financial Module - Complete MySQL Database Schema

-- Plano de Contas (Chart of Accounts)
CREATE TABLE plano_contas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(200) NOT NULL,
    tipo ENUM('ATIVO', 'PASSIVO', 'RECEITA', 'DESPESA', 'PATRIMONIO_LIQUIDO') NOT NULL,
    natureza ENUM('DEVEDORA', 'CREDORA') NOT NULL,
    nivel INT NOT NULL,
    conta_pai_id BIGINT NULL,
    aceita_lancamento BOOLEAN DEFAULT TRUE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (conta_pai_id) REFERENCES plano_contas(id),
    INDEX idx_codigo (codigo),
    INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Centro de Custos
CREATE TABLE centro_custo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Fornecedores
CREATE TABLE fornecedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(200),
    cnpj VARCHAR(18) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    inscricao_estadual VARCHAR(20),
    email VARCHAR(100),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    endereco VARCHAR(200),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cnpj (cnpj),
    INDEX idx_cpf (cpf),
    INDEX idx_razao_social (razao_social)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Clientes
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(200),
    cnpj VARCHAR(18) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    inscricao_estadual VARCHAR(20),
    email VARCHAR(100),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    endereco VARCHAR(200),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    limite_credito DECIMAL(15,2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cnpj (cnpj),
    INDEX idx_cpf (cpf),
    INDEX idx_razao_social (razao_social)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contas Bancárias
CREATE TABLE conta_bancaria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    banco VARCHAR(100) NOT NULL,
    agencia VARCHAR(20) NOT NULL,
    numero_conta VARCHAR(30) NOT NULL,
    tipo_conta ENUM('CORRENTE', 'POUPANCA', 'APLICACAO') NOT NULL,
    saldo_inicial DECIMAL(15,2) DEFAULT 0,
    saldo_atual DECIMAL(15,2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_banco (banco)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contas a Pagar
CREATE TABLE conta_pagar (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fornecedor_id BIGINT NOT NULL,
    centro_custo_id BIGINT,
    conta_contabil_id BIGINT NOT NULL,
    numero_documento VARCHAR(50),
    descricao VARCHAR(500) NOT NULL,
    data_emissao DATE NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    valor_original DECIMAL(15,2) NOT NULL,
    valor_juros DECIMAL(15,2) DEFAULT 0,
    valor_multa DECIMAL(15,2) DEFAULT 0,
    valor_desconto DECIMAL(15,2) DEFAULT 0,
    valor_pago DECIMAL(15,2) DEFAULT 0,
    valor_total DECIMAL(15,2) NOT NULL,
    status ENUM('PENDENTE', 'PAGO', 'CANCELADO', 'VENCIDO') DEFAULT 'PENDENTE',
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id),
    FOREIGN KEY (centro_custo_id) REFERENCES centro_custo(id),
    FOREIGN KEY (conta_contabil_id) REFERENCES plano_contas(id),
    INDEX idx_vencimento (data_vencimento),
    INDEX idx_status (status),
    INDEX idx_fornecedor (fornecedor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contas a Receber
CREATE TABLE conta_receber (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    centro_custo_id BIGINT,
    conta_contabil_id BIGINT NOT NULL,
    numero_documento VARCHAR(50),
    descricao VARCHAR(500) NOT NULL,
    data_emissao DATE NOT NULL,
    data_vencimento DATE NOT NULL,
    data_recebimento DATE,
    valor_original DECIMAL(15,2) NOT NULL,
    valor_juros DECIMAL(15,2) DEFAULT 0,
    valor_multa DECIMAL(15,2) DEFAULT 0,
    valor_desconto DECIMAL(15,2) DEFAULT 0,
    valor_recebido DECIMAL(15,2) DEFAULT 0,
    valor_total DECIMAL(15,2) NOT NULL,
    status ENUM('PENDENTE', 'RECEBIDO', 'CANCELADO', 'VENCIDO') DEFAULT 'PENDENTE',
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (centro_custo_id) REFERENCES centro_custo(id),
    FOREIGN KEY (conta_contabil_id) REFERENCES plano_contas(id),
    INDEX idx_vencimento (data_vencimento),
    INDEX idx_status (status),
    INDEX idx_cliente (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Lançamentos Contábeis
CREATE TABLE lancamento_contabil (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_lancamento DATE NOT NULL,
    historico VARCHAR(500) NOT NULL,
    tipo_documento VARCHAR(50),
    numero_documento VARCHAR(50),
    valor_total DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_data (data_lancamento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Itens do Lançamento Contábil
CREATE TABLE item_lancamento_contabil (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lancamento_contabil_id BIGINT NOT NULL,
    conta_contabil_id BIGINT NOT NULL,
    centro_custo_id BIGINT,
    tipo_lancamento ENUM('DEBITO', 'CREDITO') NOT NULL,
    valor DECIMAL(15,2) NOT NULL,
    historico_complementar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lancamento_contabil_id) REFERENCES lancamento_contabil(id) ON DELETE CASCADE,
    FOREIGN KEY (conta_contabil_id) REFERENCES plano_contas(id),
    FOREIGN KEY (centro_custo_id) REFERENCES centro_custo(id),
    INDEX idx_lancamento (lancamento_contabil_id),
    INDEX idx_conta (conta_contabil_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Movimentações Bancárias
CREATE TABLE movimentacao_bancaria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conta_bancaria_id BIGINT NOT NULL,
    tipo_movimentacao ENUM('ENTRADA', 'SAIDA', 'TRANSFERENCIA') NOT NULL,
    data_movimentacao DATE NOT NULL,
    valor DECIMAL(15,2) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    numero_documento VARCHAR(50),
    conta_pagar_id BIGINT,
    conta_receber_id BIGINT,
    lancamento_contabil_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (conta_bancaria_id) REFERENCES conta_bancaria(id),
    FOREIGN KEY (conta_pagar_id) REFERENCES conta_pagar(id),
    FOREIGN KEY (conta_receber_id) REFERENCES conta_receber(id),
    FOREIGN KEY (lancamento_contabil_id) REFERENCES lancamento_contabil(id),
    INDEX idx_conta_bancaria (conta_bancaria_id),
    INDEX idx_data (data_movimentacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Fluxo de Caixa
CREATE TABLE fluxo_caixa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_referencia DATE NOT NULL,
    tipo ENUM('PREVISTO', 'REALIZADO') NOT NULL,
    categoria ENUM('ENTRADA', 'SAIDA') NOT NULL,
    valor DECIMAL(15,2) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    conta_bancaria_id BIGINT,
    centro_custo_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conta_bancaria_id) REFERENCES conta_bancaria(id),
    FOREIGN KEY (centro_custo_id) REFERENCES centro_custo(id),
    INDEX idx_data (data_referencia),
    INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data for Plano de Contas
INSERT INTO plano_contas (codigo, nome, tipo, natureza, nivel, conta_pai_id, aceita_lancamento) VALUES
('1', 'ATIVO', 'ATIVO', 'DEVEDORA', 1, NULL, FALSE),
('1.1', 'ATIVO CIRCULANTE', 'ATIVO', 'DEVEDORA', 2, 1, FALSE),
('1.1.1', 'CAIXA E BANCOS', 'ATIVO', 'DEVEDORA', 3, 2, FALSE),
('1.1.1.01', 'Caixa Geral', 'ATIVO', 'DEVEDORA', 4, 3, TRUE),
('1.1.1.02', 'Banco Conta Corrente', 'ATIVO', 'DEVEDORA', 4, 3, TRUE),
('1.1.2', 'CONTAS A RECEBER', 'ATIVO', 'DEVEDORA', 3, 2, FALSE),
('1.1.2.01', 'Clientes', 'ATIVO', 'DEVEDORA', 4, 6, TRUE),
('2', 'PASSIVO', 'PASSIVO', 'CREDORA', 1, NULL, FALSE),
('2.1', 'PASSIVO CIRCULANTE', 'PASSIVO', 'CREDORA', 2, 8, FALSE),
('2.1.1', 'CONTAS A PAGAR', 'PASSIVO', 'CREDORA', 3, 9, FALSE),
('2.1.1.01', 'Fornecedores', 'PASSIVO', 'CREDORA', 4, 10, TRUE),
('3', 'RECEITAS', 'RECEITA', 'CREDORA', 1, NULL, FALSE),
('3.1', 'RECEITAS OPERACIONAIS', 'RECEITA', 'CREDORA', 2, 12, FALSE),
('3.1.1', 'Receita de Vendas', 'RECEITA', 'CREDORA', 3, 13, TRUE),
('4', 'DESPESAS', 'DESPESA', 'DEVEDORA', 1, NULL, FALSE),
('4.1', 'DESPESAS OPERACIONAIS', 'DESPESA', 'DEVEDORA', 2, 15, FALSE),
('4.1.1', 'Despesas Administrativas', 'DESPESA', 'DEVEDORA', 3, 16, TRUE),
('4.1.2', 'Despesas com Pessoal', 'DESPESA', 'DEVEDORA', 3, 16, TRUE);

-- Insert sample Centro de Custo
INSERT INTO centro_custo (codigo, nome, descricao) VALUES
('CC001', 'Administrativo', 'Centro de custo administrativo'),
('CC002', 'Vendas', 'Centro de custo de vendas'),
('CC003', 'Financeiro', 'Centro de custo financeiro');
