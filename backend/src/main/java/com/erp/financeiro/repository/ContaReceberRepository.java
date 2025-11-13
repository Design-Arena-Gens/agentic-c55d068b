package com.erp.financeiro.repository;

import com.erp.financeiro.model.ContaReceber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContaReceberRepository extends JpaRepository<ContaReceber, Long> {
    List<ContaReceber> findByStatus(ContaReceber.StatusConta status);
    List<ContaReceber> findByDataVencimentoBetween(LocalDate inicio, LocalDate fim);
    List<ContaReceber> findByClienteId(Long clienteId);

    @Query("SELECT SUM(c.valorTotal) FROM ContaReceber c WHERE c.status = :status")
    BigDecimal somarPorStatus(ContaReceber.StatusConta status);

    @Query("SELECT c FROM ContaReceber c WHERE c.dataVencimento < CURRENT_DATE AND c.status = 'PENDENTE'")
    List<ContaReceber> findVencidas();
}
