package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Dono;
import scarpellini.jsf_test.repository.AnimalRepository;
import scarpellini.jsf_test.repository.DonoRepository;

import java.util.List;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final DonoRepository donoRepo;

    public AnimalService(
            AnimalRepository animalRepository,
            DonoRepository donoRepo
    ) {
        this.animalRepository = animalRepository;
        this.donoRepo = donoRepo;
    }

    @Transactional(readOnly = true)
    public List<Animal> listarTodosComDono() {
        return animalRepository.findAllComDono();
    }

    @Transactional(readOnly = true)
    public Animal buscarPorId(Long id) {
        return animalRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Animal não encontrado: " + id));
    }

    @Transactional
    public Animal cadastrar(Animal animal, Dono dono) {
        Dono novoDono = donoRepo.save(dono);
        Animal novoAnimal = new Animal(
                animal.getNome(),
                animal.getEspecie(),
                animal.getRaca(),
                animal.getDataNascimento(),
                novoDono
        );

        return animalRepository.save(novoAnimal);
    }

    @Transactional
    public void excluir(Long id) {
        Animal animal = buscarPorId(id);
        animalRepository.delete(animal);
    }
}
