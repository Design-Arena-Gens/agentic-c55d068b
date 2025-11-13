package com.erp.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CentroCustoDTO {
    private Long id;
    private String codigo;
    private String nome;
    private String descricao;
    private Boolean ativo;
}
