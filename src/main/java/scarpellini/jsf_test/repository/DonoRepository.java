package scarpellini.jsf_test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import scarpellini.jsf_test.domain.Dono;

public interface DonoRepository extends JpaRepository<Dono, Long> {
}
