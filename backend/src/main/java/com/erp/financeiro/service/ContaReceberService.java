package com.erp.financeiro.service;

import com.erp.financeiro.dto.ContaReceberDTO;
import com.erp.financeiro.model.*;
import com.erp.financeiro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContaReceberService {

    private final ContaReceberRepository repository;
    private final ClienteRepository clienteRepository;
    private final CentroCustoRepository centroCustoRepository;
    private final PlanoContasRepository planoContasRepository;

    @Transactional(readOnly = true)
    public List<ContaReceberDTO> findAll() {
        return repository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContaReceberDTO findById(Long id) {
        return repository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new RuntimeException("Conta a receber não encontrada"));
    }

    @Transactional(readOnly = true)
    public List<ContaReceberDTO> findByStatus(String status) {
        return repository.findByStatus(ContaReceber.StatusConta.valueOf(status)).stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public ContaReceberDTO save(ContaReceberDTO dto) {
        ContaReceber entity = toEntity(dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public ContaReceberDTO update(Long id, ContaReceberDTO dto) {
        ContaReceber entity = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Conta a receber não encontrada"));

        updateEntity(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public ContaReceberDTO receber(Long id, ContaReceberDTO dto) {
        ContaReceber entity = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Conta a receber não encontrada"));

        entity.setDataRecebimento(dto.getDataRecebimento());
        entity.setValorRecebido(dto.getValorRecebido());
        entity.setValorJuros(dto.getValorJuros());
        entity.setValorMulta(dto.getValorMulta());
        entity.setValorDesconto(dto.getValorDesconto());
        entity.setStatus(ContaReceber.StatusConta.RECEBIDO);
        entity.calcularValorTotal();

        return toDTO(repository.save(entity));
    }

    private ContaReceberDTO toDTO(ContaReceber entity) {
        ContaReceberDTO dto = new ContaReceberDTO();
        dto.setId(entity.getId());
        dto.setClienteId(entity.getCliente().getId());
        dto.setClienteNome(entity.getCliente().getRazaoSocial());

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
        dto.setDataRecebimento(entity.getDataRecebimento());
        dto.setValorOriginal(entity.getValorOriginal());
        dto.setValorJuros(entity.getValorJuros());
        dto.setValorMulta(entity.getValorMulta());
        dto.setValorDesconto(entity.getValorDesconto());
        dto.setValorRecebido(entity.getValorRecebido());
        dto.setValorTotal(entity.getValorTotal());
        dto.setStatus(entity.getStatus());
        dto.setObservacao(entity.getObservacao());

        return dto;
    }

    private ContaReceber toEntity(ContaReceberDTO dto) {
        ContaReceber entity = new ContaReceber();
        updateEntity(entity, dto);
        return entity;
    }

    private void updateEntity(ContaReceber entity, ContaReceberDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        entity.setCliente(cliente);

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
        entity.setDataRecebimento(dto.getDataRecebimento());
        entity.setValorOriginal(dto.getValorOriginal());
        entity.setValorJuros(dto.getValorJuros());
        entity.setValorMulta(dto.getValorMulta());
        entity.setValorDesconto(dto.getValorDesconto());
        entity.setValorRecebido(dto.getValorRecebido());
        entity.setStatus(dto.getStatus());
        entity.setObservacao(dto.getObservacao());
        entity.calcularValorTotal();
    }
}
