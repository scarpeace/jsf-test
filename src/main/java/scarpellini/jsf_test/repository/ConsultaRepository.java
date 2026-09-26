package scarpellini.jsf_test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import scarpellini.jsf_test.domain.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}
