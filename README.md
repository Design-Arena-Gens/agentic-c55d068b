# ERP Financeiro - Módulo Financeiro Completo

Sistema ERP completo focado no módulo financeiro, desenvolvido com Java 21, Spring Boot 3, Angular 17 e MySQL.

## 🚀 Demonstração

**Acesse a demonstração online:** https://agentic-c55d068b.vercel.app

## 📋 Tecnologias Utilizadas

### Backend
- **Java 21** - Linguagem de programação
- **Spring Boot 3.2.0** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **MySQL** - Banco de dados relacional
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

### Frontend
- **Angular 17** - Framework frontend principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **HttpClient** - Comunicação REST

## 🔌 API REST - Endpoints

### Contas a Pagar
- GET /api/contas-pagar - Lista todas
- POST /api/contas-pagar - Cria nova
- PUT /api/contas-pagar/{id}/pagar - Efetua pagamento

### Contas a Receber
- GET /api/contas-receber - Lista todas
- POST /api/contas-receber - Cria nova
- PUT /api/contas-receber/{id}/receber - Efetua recebimento

### Plano de Contas
- GET /api/plano-contas - Lista todas
- POST /api/plano-contas - Cria nova

## 🗄️ Estrutura do Banco de Dados

Tabelas: plano_contas, centro_custo, fornecedor, cliente, conta_bancaria, conta_pagar, conta_receber, lancamento_contabil, movimentacao_bancaria, fluxo_caixa

Ver schema completo em: database/schema.sql

## 🚀 Como Executar

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Acesse: http://localhost:4200
