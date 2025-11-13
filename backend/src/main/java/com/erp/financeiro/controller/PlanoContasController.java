package com.erp.financeiro.controller;

import com.erp.financeiro.dto.PlanoContasDTO;
import com.erp.financeiro.service.PlanoContasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/plano-contas")
@RequiredArgsConstructor
public class PlanoContasController {

    private final PlanoContasService service;

    @GetMapping
    public ResponseEntity<List<PlanoContasDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoContasDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<PlanoContasDTO> save(@RequestBody PlanoContasDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoContasDTO> update(@PathVariable Long id, @RequestBody PlanoContasDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
