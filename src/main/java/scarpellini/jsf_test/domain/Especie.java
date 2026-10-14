package scarpellini.jsf_test.domain;

import lombok.Getter;

@Getter
public enum Especie {
    GATO("Gato"),
    CACHORRO("Cachorro");

    private final String descricao;

    Especie(String descricao) {
        this.descricao = descricao;
    }

}
