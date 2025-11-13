package com.erp.financeiro.repository;

import com.erp.financeiro.model.CentroCusto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CentroCustoRepository extends JpaRepository<CentroCusto, Long> {
    Optional<CentroCusto> findByCodigo(String codigo);
    List<CentroCusto> findByAtivoTrue();
}
