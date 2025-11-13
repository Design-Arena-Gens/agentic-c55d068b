package com.erp.financeiro.service;

import com.erp.financeiro.dto.ContaPagarDTO;
import com.erp.financeiro.model.*;
import com.erp.financeiro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContaPagarService {

    private final ContaPagarRepository repository;
    private final FornecedorRepository fornecedorRepository;
    private final CentroCustoRepository centroCustoRepository;
    private final PlanoContasRepository planoContasRepository;

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findAll() {
        return repository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContaPagarDTO findById(Long id) {
        return repository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new RuntimeException("Conta a pagar não encontrada"));
    }

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByStatus(String status) {
        return repository.findByStatus(ContaPagar.StatusConta.valueOf(status)).stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public ContaPagarDTO save(ContaPagarDTO dto) {
        ContaPagar entity = toEntity(dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public ContaPagarDTO update(Long id, ContaPagarDTO dto) {
        ContaPagar entity = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Conta a pagar não encontrada"));

        updateEntity(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public ContaPagarDTO pagar(Long id, ContaPagarDTO dto) {
        ContaPagar entity = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Conta a pagar não encontrada"));

        entity.setDataPagamento(dto.getDataPagamento());
        entity.setValorPago(dto.getValorPago());
        entity.setValorJuros(dto.getValorJuros());
        entity.setValorMulta(dto.getValorMulta());
        entity.setValorDesconto(dto.getValorDesconto());
        entity.setStatus(ContaPagar.StatusConta.PAGO);
        entity.calcularValorTotal();

        return toDTO(repository.save(entity));
    }

    private ContaPagarDTO toDTO(ContaPagar entity) {
        ContaPagarDTO dto = new ContaPagarDTO();
        dto.setId(entity.getId());
        dto.setFornecedorId(entity.getFornecedor().getId());
        dto.setFornecedorNome(entity.getFornecedor().getRazaoSocial());

        if (entity.getCentroCusto() != null) {
            dto.setCentroCustoId(entity.getCentroCusto().getId());
            dto.setCentroCustoNome(entity.getCentroCusto().getNome());
        }

        dto.setContaContabilId(entity.getContaContabil().getId());
        dto.setContaContabilNome(entity.getContaContabil().getNome());
        dto.setNumeroDocumento(entity.getNumeroDocumento());
        dto.setDescricao(entity.getDescricao());
        dto.setDataEmissao(entity.getDataEmissao());
        dto.setDataVencimento(entity.getDataVencimento());
        dto.setDataPagamento(entity.getDataPagamento());
        dto.setValorOriginal(entity.getValorOriginal());
        dto.setValorJuros(entity.getValorJuros());
        dto.setValorMulta(entity.getValorMulta());
        dto.setValorDesconto(entity.getValorDesconto());
        dto.setValorPago(entity.getValorPago());
        dto.setValorTotal(entity.getValorTotal());
        dto.setStatus(entity.getStatus());
        dto.setObservacao(entity.getObservacao());

        return dto;
    }

    private ContaPagar toEntity(ContaPagarDTO dto) {
        ContaPagar entity = new ContaPagar();
        updateEntity(entity, dto);
        return entity;
    }

    private void updateEntity(ContaPagar entity, ContaPagarDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorId())
            .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
        entity.setFornecedor(fornecedor);

        if (dto.getCentroCustoId() != null) {
            CentroCusto centroCusto = centroCustoRepository.findById(dto.getCentroCustoId())
                .orElseThrow(() -> new RuntimeException("Centro de custo não encontrado"));
            entity.setCentroCusto(centroCusto);
        }

        PlanoContas contaContabil = planoContasRepository.findById(dto.getContaContabilId())
            .orElseThrow(() -> new RuntimeException("Conta contábil não encontrada"));
        entity.setContaContabil(contaContabil);

        entity.setNumeroDocumento(dto.getNumeroDocumento());
        entity.setDescricao(dto.getDescricao());
        entity.setDataEmissao(dto.getDataEmissao());
        entity.setDataVencimento(dto.getDataVencimento());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setValorOriginal(dto.getValorOriginal());
        entity.setValorJuros(dto.getValorJuros());
        entity.setValorMulta(dto.getValorMulta());
        entity.setValorDesconto(dto.getValorDesconto());
        entity.setValorPago(dto.getValorPago());
        entity.setStatus(dto.getStatus());
        entity.setObservacao(dto.getObservacao());
        entity.calcularValorTotal();
    }
}
