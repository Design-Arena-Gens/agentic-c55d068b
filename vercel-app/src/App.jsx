import { useState } from 'react'

const mockContasPagar = [
  { id: 1, fornecedorNome: 'Fornecedor ABC', descricao: 'Compra de materiais', numeroDocumento: 'NF-001', dataEmissao: '2025-01-10', dataVencimento: '2025-02-10', valorOriginal: 5000, valorTotal: 5000, status: 'PENDENTE' },
  { id: 2, fornecedorNome: 'Fornecedor XYZ', descricao: 'Serviços de manutenção', numeroDocumento: 'NF-002', dataEmissao: '2025-01-15', dataVencimento: '2025-02-15', valorOriginal: 3000, valorTotal: 3000, status: 'PENDENTE' },
  { id: 3, fornecedorNome: 'Fornecedor 123', descricao: 'Aluguel', numeroDocumento: 'NF-003', dataEmissao: '2024-12-01', dataVencimento: '2025-01-01', valorOriginal: 8000, valorTotal: 8000, status: 'PAGO' },
]

const mockContasReceber = [
  { id: 1, clienteNome: 'Cliente Alpha', descricao: 'Venda de produtos', numeroDocumento: 'NF-101', dataEmissao: '2025-01-12', dataVencimento: '2025-02-12', valorOriginal: 12000, valorTotal: 12000, status: 'PENDENTE' },
  { id: 2, clienteNome: 'Cliente Beta', descricao: 'Prestação de serviços', numeroDocumento: 'NF-102', dataEmissao: '2025-01-18', dataVencimento: '2025-02-18', valorOriginal: 7500, valorTotal: 7500, status: 'PENDENTE' },
  { id: 3, clienteNome: 'Cliente Gamma', descricao: 'Consultoria', numeroDocumento: 'NF-103', dataEmissao: '2024-12-15', dataVencimento: '2025-01-15', valorOriginal: 15000, valorTotal: 15000, status: 'RECEBIDO' },
]

const mockPlanoContas = [
  { codigo: '1', nome: 'ATIVO', tipo: 'ATIVO', natureza: 'DEVEDORA', nivel: 1, aceitaLancamento: false, ativo: true },
  { codigo: '1.1', nome: 'ATIVO CIRCULANTE', tipo: 'ATIVO', natureza: 'DEVEDORA', nivel: 2, aceitaLancamento: false, ativo: true },
  { codigo: '1.1.1', nome: 'CAIXA E BANCOS', tipo: 'ATIVO', natureza: 'DEVEDORA', nivel: 3, aceitaLancamento: false, ativo: true },
  { codigo: '1.1.1.01', nome: 'Caixa Geral', tipo: 'ATIVO', natureza: 'DEVEDORA', nivel: 4, aceitaLancamento: true, ativo: true },
  { codigo: '1.1.1.02', nome: 'Banco Conta Corrente', tipo: 'ATIVO', natureza: 'DEVEDORA', nivel: 4, aceitaLancamento: true, ativo: true },
  { codigo: '2', nome: 'PASSIVO', tipo: 'PASSIVO', natureza: 'CREDORA', nivel: 1, aceitaLancamento: false, ativo: true },
  { codigo: '3', nome: 'RECEITAS', tipo: 'RECEITA', natureza: 'CREDORA', nivel: 1, aceitaLancamento: false, ativo: true },
  { codigo: '4', nome: 'DESPESAS', tipo: 'DESPESA', natureza: 'DEVEDORA', nivel: 1, aceitaLancamento: false, ativo: true },
]

function App() {
  const [currentView, setCurrentView] = useState('overview')
  const [contasPagar, setContasPagar] = useState(mockContasPagar)
  const [contasReceber, setContasReceber] = useState(mockContasReceber)
  const [filterPagar, setFilterPagar] = useState('TODAS')
  const [filterReceber, setFilterReceber] = useState('TODAS')

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const handlePagar = (id) => {
    setContasPagar(contasPagar.map(c =>
      c.id === id ? { ...c, status: 'PAGO', dataPagamento: new Date().toISOString().split('T')[0] } : c
    ))
  }

  const handleReceber = (id) => {
    setContasReceber(contasReceber.map(c =>
      c.id === id ? { ...c, status: 'RECEBIDO', dataRecebimento: new Date().toISOString().split('T')[0] } : c
    ))
  }

  const handleDeletePagar = (id) => {
    if (confirm('Deseja realmente excluir esta conta?')) {
      setContasPagar(contasPagar.filter(c => c.id !== id))
    }
  }

  const handleDeleteReceber = (id) => {
    if (confirm('Deseja realmente excluir esta conta?')) {
      setContasReceber(contasReceber.filter(c => c.id !== id))
    }
  }

  const filteredContasPagar = filterPagar === 'TODAS'
    ? contasPagar
    : contasPagar.filter(c => c.status === filterPagar)

  const filteredContasReceber = filterReceber === 'TODAS'
    ? contasReceber
    : contasReceber.filter(c => c.status === filterReceber)

  const totalPagarPendente = contasPagar.filter(c => c.status === 'PENDENTE').length
  const totalReceberPendente = contasReceber.filter(c => c.status === 'PENDENTE').length

  return (
    <div className="app">
      <div className="header">
        <h1>💼 ERP Financeiro</h1>
        <p>Sistema Completo de Gestão Financeira - Módulo Financeiro</p>
      </div>

      <div className="nav">
        <button
          className={currentView === 'overview' ? 'active' : ''}
          onClick={() => setCurrentView('overview')}
        >
          📊 Visão Geral
        </button>
        <button
          className={currentView === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentView('dashboard')}
        >
          📈 Dashboard
        </button>
        <button
          className={currentView === 'pagar' ? 'active' : ''}
          onClick={() => setCurrentView('pagar')}
        >
          💸 Contas a Pagar
        </button>
        <button
          className={currentView === 'receber' ? 'active' : ''}
          onClick={() => setCurrentView('receber')}
        >
          💰 Contas a Receber
        </button>
        <button
          className={currentView === 'planocontas' ? 'active' : ''}
          onClick={() => setCurrentView('planocontas')}
        >
          📋 Plano de Contas
        </button>
      </div>

      <div className="content">
        {currentView === 'overview' && (
          <div className="section">
            <h2>Sobre o Sistema</h2>
            <div className="info-box">
              <h3>Módulo Financeiro Completo</h3>
              <p>
                Este é um sistema ERP completo focado no módulo financeiro, desenvolvido com as mais modernas tecnologias do mercado.
                O sistema oferece gestão completa de contas a pagar, contas a receber, plano de contas, centro de custos,
                fornecedores, clientes, contas bancárias e muito mais.
              </p>
            </div>

            <div className="info-box">
              <h3>Stack Tecnológico</h3>
              <div className="tech-stack">
                <div className="tech-item">☕ Java 21</div>
                <div className="tech-item">🍃 Spring Boot 3</div>
                <div className="tech-item">🅰️ Angular 17</div>
                <div className="tech-item">🗄️ MySQL</div>
                <div className="tech-item">🔄 REST API</div>
                <div className="tech-item">⚛️ React (Demo)</div>
              </div>
            </div>

            <div className="info-box">
              <h3>Arquitetura do Sistema</h3>
              <p><strong>Backend (Java 21 + Spring Boot):</strong></p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Arquitetura em camadas (Controller, Service, Repository)</li>
                <li>API REST com endpoints para todas as operações</li>
                <li>JPA/Hibernate para persistência de dados</li>
                <li>Validações e tratamento de exceções</li>
                <li>CORS configurado para integração com frontend</li>
              </ul>
              <p style={{marginTop: '15px'}}><strong>Frontend (Angular 17):</strong></p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Componentes standalone (nova arquitetura Angular)</li>
                <li>Services para comunicação com API</li>
                <li>Roteamento e navegação</li>
                <li>Interface responsiva e moderna</li>
                <li>Gerenciamento de estado reativo</li>
              </ul>
            </div>

            <div className="info-box">
              <h3>Funcionalidades Principais</h3>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>📊 Dashboard com indicadores financeiros</li>
                <li>💸 Gestão completa de Contas a Pagar</li>
                <li>💰 Gestão completa de Contas a Receber</li>
                <li>📋 Plano de Contas estruturado</li>
                <li>🏢 Cadastro de Fornecedores e Clientes</li>
                <li>🏦 Controle de Contas Bancárias</li>
                <li>💼 Centros de Custo</li>
                <li>📝 Lançamentos Contábeis</li>
                <li>💵 Movimentações Bancárias</li>
                <li>📈 Fluxo de Caixa</li>
              </ul>
            </div>

            <div className="code-section">
              <h3 style={{color: '#90cdf4', marginBottom: '15px'}}>Estrutura do Banco de Dados</h3>
              <pre>{`-- Principais Tabelas MySQL:
- plano_contas (Plano de Contas)
- centro_custo (Centros de Custo)
- fornecedor (Fornecedores)
- cliente (Clientes)
- conta_bancaria (Contas Bancárias)
- conta_pagar (Contas a Pagar)
- conta_receber (Contas a Receber)
- lancamento_contabil (Lançamentos Contábeis)
- movimentacao_bancaria (Movimentações Bancárias)
- fluxo_caixa (Fluxo de Caixa)`}</pre>
            </div>

            <div className="code-section">
              <h3 style={{color: '#90cdf4', marginBottom: '15px'}}>Exemplos de Endpoints REST</h3>
              <pre>{`GET    /api/contas-pagar              - Lista todas as contas a pagar
POST   /api/contas-pagar              - Cria nova conta a pagar
PUT    /api/contas-pagar/{id}         - Atualiza conta a pagar
PUT    /api/contas-pagar/{id}/pagar   - Efetua pagamento
DELETE /api/contas-pagar/{id}         - Remove conta a pagar

GET    /api/contas-receber            - Lista todas as contas a receber
POST   /api/contas-receber            - Cria nova conta a receber
PUT    /api/contas-receber/{id}/receber - Efetua recebimento

GET    /api/plano-contas              - Lista plano de contas
POST   /api/plano-contas              - Cria nova conta contábil`}</pre>
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="section">
            <h2>Dashboard</h2>
            <div className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-label">Contas a Pagar Pendentes</div>
                <div className="stat-value">{totalPagarPendente}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Contas a Receber Pendentes</div>
                <div className="stat-value">{totalReceberPendente}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total de Contas</div>
                <div className="stat-value">{contasPagar.length + contasReceber.length}</div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'pagar' && (
          <div className="section">
            <h2>Contas a Pagar</h2>
            <div className="filter-buttons">
              <button
                className={filterPagar === 'TODAS' ? 'active' : ''}
                onClick={() => setFilterPagar('TODAS')}
              >
                Todas
              </button>
              <button
                className={filterPagar === 'PENDENTE' ? 'active' : ''}
                onClick={() => setFilterPagar('PENDENTE')}
              >
                Pendentes
              </button>
              <button
                className={filterPagar === 'PAGO' ? 'active' : ''}
                onClick={() => setFilterPagar('PAGO')}
              >
                Pagas
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Descrição</th>
                  <th>Nº Doc</th>
                  <th>Emissão</th>
                  <th>Vencimento</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContasPagar.map(conta => (
                  <tr key={conta.id}>
                    <td>{conta.fornecedorNome}</td>
                    <td>{conta.descricao}</td>
                    <td>{conta.numeroDocumento}</td>
                    <td>{formatDate(conta.dataEmissao)}</td>
                    <td>{formatDate(conta.dataVencimento)}</td>
                    <td>{formatCurrency(conta.valorTotal)}</td>
                    <td>
                      <span className={`status-badge status-${conta.status.toLowerCase()}`}>
                        {conta.status}
                      </span>
                    </td>
                    <td className="actions">
                      {conta.status === 'PENDENTE' && (
                        <button className="btn btn-success" onClick={() => handlePagar(conta.id)}>
                          Pagar
                        </button>
                      )}
                      <button className="btn btn-danger" onClick={() => handleDeletePagar(conta.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === 'receber' && (
          <div className="section">
            <h2>Contas a Receber</h2>
            <div className="filter-buttons">
              <button
                className={filterReceber === 'TODAS' ? 'active' : ''}
                onClick={() => setFilterReceber('TODAS')}
              >
                Todas
              </button>
              <button
                className={filterReceber === 'PENDENTE' ? 'active' : ''}
                onClick={() => setFilterReceber('PENDENTE')}
              >
                Pendentes
              </button>
              <button
                className={filterReceber === 'RECEBIDO' ? 'active' : ''}
                onClick={() => setFilterReceber('RECEBIDO')}
              >
                Recebidas
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Descrição</th>
                  <th>Nº Doc</th>
                  <th>Emissão</th>
                  <th>Vencimento</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContasReceber.map(conta => (
                  <tr key={conta.id}>
                    <td>{conta.clienteNome}</td>
                    <td>{conta.descricao}</td>
                    <td>{conta.numeroDocumento}</td>
                    <td>{formatDate(conta.dataEmissao)}</td>
                    <td>{formatDate(conta.dataVencimento)}</td>
                    <td>{formatCurrency(conta.valorTotal)}</td>
                    <td>
                      <span className={`status-badge status-${conta.status.toLowerCase()}`}>
                        {conta.status}
                      </span>
                    </td>
                    <td className="actions">
                      {conta.status === 'PENDENTE' && (
                        <button className="btn btn-success" onClick={() => handleReceber(conta.id)}>
                          Receber
                        </button>
                      )}
                      <button className="btn btn-danger" onClick={() => handleDeleteReceber(conta.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === 'planocontas' && (
          <div className="section">
            <h2>Plano de Contas</h2>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Natureza</th>
                  <th>Nível</th>
                  <th>Aceita Lançamento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPlanoContas.map(conta => (
                  <tr key={conta.codigo}>
                    <td>{conta.codigo}</td>
                    <td style={{paddingLeft: `${conta.nivel * 20}px`}}>{conta.nome}</td>
                    <td>{conta.tipo}</td>
                    <td>{conta.natureza}</td>
                    <td>{conta.nivel}</td>
                    <td>{conta.aceitaLancamento ? 'Sim' : 'Não'}</td>
                    <td>
                      <span className={`status-badge ${conta.ativo ? 'status-pago' : 'status-cancelado'}`}>
                        {conta.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
