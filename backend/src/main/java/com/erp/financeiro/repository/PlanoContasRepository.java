package com.erp.financeiro.repository;

import com.erp.financeiro.model.PlanoContas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlanoContasRepository extends JpaRepository<PlanoContas, Long> {
    Optional<PlanoContas> findByCodigo(String codigo);
    List<PlanoContas> findByAtivoTrue();
    List<PlanoContas> findByTipo(PlanoContas.TipoConta tipo);
    List<PlanoContas> findByContaPaiId(Long contaPaiId);
}
