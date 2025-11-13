package com.erp.financeiro.repository;

import com.erp.financeiro.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCnpj(String cnpj);
    Optional<Cliente> findByCpf(String cpf);
    List<Cliente> findByAtivoTrue();
    List<Cliente> findByRazaoSocialContainingIgnoreCase(String razaoSocial);
}
