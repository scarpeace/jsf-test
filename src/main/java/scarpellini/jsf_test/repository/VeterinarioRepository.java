package scarpellini.jsf_test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import scarpellini.jsf_test.domain.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {
}
