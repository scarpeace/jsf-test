package scarpellini.jsf_test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import scarpellini.jsf_test.domain.Animal;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("select animal from Animal animal join fetch animal.dono order by animal.nome")
    List<Animal> findAllComDono();
}
