CREATE TABLE dono (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(150)
);

CREATE TABLE animal (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    data_nascimento DATE,
    dono_id BIGINT NOT NULL,
    CONSTRAINT fk_animal_dono
        FOREIGN KEY (dono_id) REFERENCES dono (id)
);

CREATE TABLE doutor (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    crmv VARCHAR(30) NOT NULL,
    telefone VARCHAR(30),
    CONSTRAINT uk_doutor_crmv UNIQUE (crmv)
);

CREATE TABLE consulta (
    id BIGSERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    observacao VARCHAR(500),
    animal_id BIGINT NOT NULL,
    doutor_id BIGINT NOT NULL,
    CONSTRAINT fk_consulta_animal
        FOREIGN KEY (animal_id) REFERENCES animal (id),
    CONSTRAINT fk_consulta_doutor
        FOREIGN KEY (doutor_id) REFERENCES doutor (id)
);

CREATE INDEX idx_animal_dono ON animal (dono_id);
CREATE INDEX idx_consulta_animal ON consulta (animal_id);
CREATE INDEX idx_consulta_doutor ON consulta (doutor_id);
