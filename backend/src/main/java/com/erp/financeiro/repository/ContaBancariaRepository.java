package com.erp.financeiro.repository;

import com.erp.financeiro.model.ContaBancaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContaBancariaRepository extends JpaRepository<ContaBancaria, Long> {
    List<ContaBancaria> findByAtivoTrue();
    List<ContaBancaria> findByBancoContainingIgnoreCase(String banco);
}
