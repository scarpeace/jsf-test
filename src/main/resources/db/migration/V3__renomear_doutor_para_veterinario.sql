ALTER TABLE doutor RENAME TO veterinario;
ALTER TABLE consulta RENAME COLUMN doutor_id TO veterinario_id;
ALTER TABLE veterinario RENAME CONSTRAINT uk_doutor_crmv TO uk_veterinario_crmv;
ALTER TABLE consulta RENAME CONSTRAINT fk_consulta_doutor TO fk_consulta_veterinario;
ALTER INDEX idx_consulta_doutor RENAME TO idx_consulta_veterinario;
