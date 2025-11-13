package com.erp.financeiro.dto;

import com.erp.financeiro.model.ContaReceber;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContaReceberDTO {
    private Long id;
    private Long clienteId;
    private String clienteNome;
    private Long centroCustoId;
    private String centroCustoNome;
    private Long contaContabilId;
    private String contaContabilNome;
    private String numeroDocumento;
    private String descricao;
    private LocalDate dataEmissao;
    private LocalDate dataVencimento;
    private LocalDate dataRecebimento;
    private BigDecimal valorOriginal;
    private BigDecimal valorJuros;
    private BigDecimal valorMulta;
    private BigDecimal valorDesconto;
    private BigDecimal valorRecebido;
    private BigDecimal valorTotal;
    private ContaReceber.StatusConta status;
    private String observacao;
}
