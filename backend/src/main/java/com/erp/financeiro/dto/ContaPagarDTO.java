package com.erp.financeiro.dto;

import com.erp.financeiro.model.ContaPagar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContaPagarDTO {
    private Long id;
    private Long fornecedorId;
    private String fornecedorNome;
    private Long centroCustoId;
    private String centroCustoNome;
    private Long contaContabilId;
    private String contaContabilNome;
    private String numeroDocumento;
    private String descricao;
    private LocalDate dataEmissao;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;
    private BigDecimal valorOriginal;
    private BigDecimal valorJuros;
    private BigDecimal valorMulta;
    private BigDecimal valorDesconto;
    private BigDecimal valorPago;
    private BigDecimal valorTotal;
    private ContaPagar.StatusConta status;
    private String observacao;
}
