package com.erp.financeiro.dto;

import com.erp.financeiro.model.ContaBancaria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContaBancariaDTO {
    private Long id;
    private String banco;
    private String agencia;
    private String numeroConta;
    private ContaBancaria.TipoConta tipoConta;
    private BigDecimal saldoInicial;
    private BigDecimal saldoAtual;
    private Boolean ativo;
}
