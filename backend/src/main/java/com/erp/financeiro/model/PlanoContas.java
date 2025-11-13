package com.erp.financeiro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "plano_contas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanoContas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String codigo;

    @Column(nullable = false, length = 200)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoConta tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Natureza natureza;

    @Column(nullable = false)
    private Integer nivel;

    @ManyToOne
    @JoinColumn(name = "conta_pai_id")
    private PlanoContas contaPai;

    @OneToMany(mappedBy = "contaPai")
    private List<PlanoContas> contasFilhas;

    @Column(name = "aceita_lancamento")
    private Boolean aceitaLancamento = true;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum TipoConta {
        ATIVO, PASSIVO, RECEITA, DESPESA, PATRIMONIO_LIQUIDO
    }

    public enum Natureza {
        DEVEDORA, CREDORA
    }
}
