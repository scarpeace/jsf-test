UPDATE animal
SET especie = UPPER(TRIM(especie))
WHERE UPPER(TRIM(especie)) IN ('GATO', 'CACHORRO');
