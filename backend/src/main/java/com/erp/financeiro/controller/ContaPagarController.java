package com.erp.financeiro.controller;

import com.erp.financeiro.dto.ContaPagarDTO;
import com.erp.financeiro.service.ContaPagarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contas-pagar")
@RequiredArgsConstructor
public class ContaPagarController {

    private final ContaPagarService service;

    @GetMapping
    public ResponseEntity<List<ContaPagarDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContaPagarDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ContaPagarDTO>> findByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<ContaPagarDTO> save(@RequestBody ContaPagarDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContaPagarDTO> update(@PathVariable Long id, @RequestBody ContaPagarDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @PutMapping("/{id}/pagar")
    public ResponseEntity<ContaPagarDTO> pagar(@PathVariable Long id, @RequestBody ContaPagarDTO dto) {
        return ResponseEntity.ok(service.pagar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
