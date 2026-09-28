-- Registros fictícios para desenvolvimento local. Os inserts são idempotentes.

INSERT INTO dono (nome, telefone, email)
SELECT 'Camila Nogueira', '(11) 99910-2401', 'camila.nogueira@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'camila.nogueira@tutores.example'
);

INSERT INTO dono (nome, telefone, email)
SELECT 'Rafael Tavares', '(11) 99910-2402', 'rafael.tavares@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'rafael.tavares@tutores.example'
);

INSERT INTO dono (nome, telefone, email)
SELECT 'Beatriz Almeida', '(21) 99920-3501', 'beatriz.almeida@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'beatriz.almeida@tutores.example'
);

INSERT INTO dono (nome, telefone, email)
SELECT 'Marcos Vinícius Rocha', '(31) 99930-4601', 'marcos.rocha@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'marcos.rocha@tutores.example'
);

INSERT INTO dono (nome, telefone, email)
SELECT 'Lívia Cardoso', '(41) 99940-5701', 'livia.cardoso@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'livia.cardoso@tutores.example'
);

INSERT INTO dono (nome, telefone, email)
SELECT 'Tiago Mendonça', '(51) 99950-6801', 'tiago.mendonca@tutores.example'
WHERE NOT EXISTS (
    SELECT 1 FROM dono WHERE email = 'tiago.mendonca@tutores.example'
);

INSERT INTO doutor (nome, crmv, telefone)
VALUES
    ('Dra. Helena Prado', 'CRMV-SP 48217', '(11) 99961-1201'),
    ('Dr. André Siqueira', 'CRMV-SP 39508', '(11) 99961-1202'),
    ('Dra. Fernanda Couto', 'CRMV-RJ 27146', '(21) 99962-2301'),
    ('Dr. Eduardo Pires', 'CRMV-MG 18432', '(31) 99963-3401'),
    ('Dra. Patrícia Leal', 'CRMV-PR 31975', '(41) 99964-4501'),
    ('Dr. Gustavo Neves', 'CRMV-RS 22681', '(51) 99965-5601')
ON CONFLICT (crmv) DO NOTHING;

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Nina', 'CACHORRO', 'Golden Retriever', DATE '2020-04-18', dono.id
FROM dono
WHERE dono.email = 'camila.nogueira@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Nina' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Pingo', 'GATO', 'SRD', DATE '2022-09-03', dono.id
FROM dono
WHERE dono.email = 'camila.nogueira@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Pingo' AND animal.especie = 'GATO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Thor', 'CACHORRO', 'Labrador Retriever', DATE '2019-11-26', dono.id
FROM dono
WHERE dono.email = 'rafael.tavares@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Thor' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Amora', 'GATO', 'Siamês', DATE '2023-02-11', dono.id
FROM dono
WHERE dono.email = 'rafael.tavares@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Amora' AND animal.especie = 'GATO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Bento', 'CACHORRO', 'Shih-tzu', DATE '2021-07-09', dono.id
FROM dono
WHERE dono.email = 'beatriz.almeida@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Bento' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Frida', 'CACHORRO', 'Beagle', DATE '2018-05-21', dono.id
FROM dono
WHERE dono.email = 'beatriz.almeida@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Frida' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Zeca', 'GATO', 'Maine Coon', DATE '2020-12-14', dono.id
FROM dono
WHERE dono.email = 'marcos.rocha@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Zeca' AND animal.especie = 'GATO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Mel', 'CACHORRO', 'Poodle', DATE '2024-01-30', dono.id
FROM dono
WHERE dono.email = 'marcos.rocha@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Mel' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Lola', 'GATO', 'Persa', DATE '2017-08-02', dono.id
FROM dono
WHERE dono.email = 'livia.cardoso@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Lola' AND animal.especie = 'GATO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Tico', 'CACHORRO', 'Dachshund', DATE '2022-06-16', dono.id
FROM dono
WHERE dono.email = 'livia.cardoso@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Tico' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Bidu', 'CACHORRO', 'Border Collie', DATE '2021-10-07', dono.id
FROM dono
WHERE dono.email = 'tiago.mendonca@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Bidu' AND animal.especie = 'CACHORRO' AND animal.dono_id = dono.id
  );

INSERT INTO animal (nome, especie, raca, data_nascimento, dono_id)
SELECT 'Cacau', 'GATO', 'SRD', DATE '2023-12-19', dono.id
FROM dono
WHERE dono.email = 'tiago.mendonca@tutores.example'
  AND NOT EXISTS (
      SELECT 1 FROM animal
      WHERE animal.nome = 'Cacau' AND animal.especie = 'GATO' AND animal.dono_id = dono.id
  );
