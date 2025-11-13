package com.erp.financeiro.service;

import com.erp.financeiro.dto.PlanoContasDTO;
import com.erp.financeiro.model.PlanoContas;
import com.erp.financeiro.repository.PlanoContasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanoContasService {

    private final PlanoContasRepository repository;

    @Transactional(readOnly = true)
    public List<PlanoContasDTO> findAll() {
        return repository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PlanoContasDTO findById(Long id) {
        return repository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new RuntimeException("Plano de contas não encontrado"));
    }

    @Transactional
    public PlanoContasDTO save(PlanoContasDTO dto) {
        PlanoContas entity = toEntity(dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public PlanoContasDTO update(Long id, PlanoContasDTO dto) {
        PlanoContas entity = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Plano de contas não encontrado"));

        entity.setCodigo(dto.getCodigo());
        entity.setNome(dto.getNome());
        entity.setTipo(dto.getTipo());
        entity.setNatureza(dto.getNatureza());
        entity.setNivel(dto.getNivel());
        entity.setAceitaLancamento(dto.getAceitaLancamento());
        entity.setAtivo(dto.getAtivo());

        if (dto.getContaPaiId() != null) {
            PlanoContas contaPai = repository.findById(dto.getContaPaiId())
                .orElseThrow(() -> new RuntimeException("Conta pai não encontrada"));
            entity.setContaPai(contaPai);
        }

        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private PlanoContasDTO toDTO(PlanoContas entity) {
        PlanoContasDTO dto = new PlanoContasDTO();
        dto.setId(entity.getId());
        dto.setCodigo(entity.getCodigo());
        dto.setNome(entity.getNome());
        dto.setTipo(entity.getTipo());
        dto.setNatureza(entity.getNatureza());
        dto.setNivel(entity.getNivel());
        dto.setAceitaLancamento(entity.getAceitaLancamento());
        dto.setAtivo(entity.getAtivo());

        if (entity.getContaPai() != null) {
            dto.setContaPaiId(entity.getContaPai().getId());
            dto.setContaPaiNome(entity.getContaPai().getNome());
        }

        return dto;
    }

    private PlanoContas toEntity(PlanoContasDTO dto) {
        PlanoContas entity = new PlanoContas();
        entity.setCodigo(dto.getCodigo());
        entity.setNome(dto.getNome());
        entity.setTipo(dto.getTipo());
        entity.setNatureza(dto.getNatureza());
        entity.setNivel(dto.getNivel());
        entity.setAceitaLancamento(dto.getAceitaLancamento());
        entity.setAtivo(dto.getAtivo());

        if (dto.getContaPaiId() != null) {
            PlanoContas contaPai = repository.findById(dto.getContaPaiId())
                .orElseThrow(() -> new RuntimeException("Conta pai não encontrada"));
            entity.setContaPai(contaPai);
        }

        return entity;
    }
}
