package com.erp.financeiro.repository;

import com.erp.financeiro.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    Optional<Fornecedor> findByCnpj(String cnpj);
    Optional<Fornecedor> findByCpf(String cpf);
    List<Fornecedor> findByAtivoTrue();
    List<Fornecedor> findByRazaoSocialContainingIgnoreCase(String razaoSocial);
}
