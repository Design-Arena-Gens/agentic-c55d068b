package com.erp.financeiro.repository;

import com.erp.financeiro.model.ContaPagar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContaPagarRepository extends JpaRepository<ContaPagar, Long> {
    List<ContaPagar> findByStatus(ContaPagar.StatusConta status);
    List<ContaPagar> findByDataVencimentoBetween(LocalDate inicio, LocalDate fim);
    List<ContaPagar> findByFornecedorId(Long fornecedorId);

    @Query("SELECT SUM(c.valorTotal) FROM ContaPagar c WHERE c.status = :status")
    BigDecimal somarPorStatus(ContaPagar.StatusConta status);

    @Query("SELECT c FROM ContaPagar c WHERE c.dataVencimento < CURRENT_DATE AND c.status = 'PENDENTE'")
    List<ContaPagar> findVencidas();
}
