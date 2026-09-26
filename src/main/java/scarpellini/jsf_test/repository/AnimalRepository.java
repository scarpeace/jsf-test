package scarpellini.jsf_test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import scarpellini.jsf_test.domain.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
