package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Dono;
import scarpellini.jsf_test.repository.AnimalRepository;

import java.util.List;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final DonoService donoService;

    public AnimalService(
            AnimalRepository animalRepository,
            DonoService donoService
    ) {
        this.animalRepository = animalRepository;
        this.donoService = donoService;
    }

    @Transactional(readOnly = true)
    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Animal buscarPorId(Long id) {
        return animalRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Animal não encontrado: " + id));
    }

    @Transactional
    public Animal salvar(Animal animal) {
        if (animal.getDono() == null || animal.getDono().getId() == null) {
            throw new IllegalArgumentException(
                    "O animal precisa possuir um dono"
            );
        }

        Dono dono = donoService.buscarPorId(animal.getDono().getId());
        animal.setDono(dono);

        return animalRepository.save(animal);
    }

    @Transactional
    public void excluir(Long id) {
        Animal animal = buscarPorId(id);
        animalRepository.delete(animal);
    }
}
