package com.erp.financeiro.dto;

import com.erp.financeiro.model.PlanoContas;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanoContasDTO {
    private Long id;
    private String codigo;
    private String nome;
    private PlanoContas.TipoConta tipo;
    private PlanoContas.Natureza natureza;
    private Integer nivel;
    private Long contaPaiId;
    private String contaPaiNome;
    private Boolean aceitaLancamento;
    private Boolean ativo;
}
