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

    @Transactional(readOnly = true)
    public Animal buscarPorIdComDono(Long id) {
        return animalRepository.findByIdComDono(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Animal não encontrado: " + id));
    }

    @Transactional
    public Animal cadastrar(Animal animal) {
        animal.setDono(donoRepo.save(animal.getDono()));
        return animalRepository.save(animal);
    }

    @Transactional
    public Animal atualizar(Long id, Animal dados) {
        Animal animal = buscarPorIdComDono(id);
        Dono dono = animal.getDono();

        animal.setNome(dados.getNome());
        animal.setEspecie(dados.getEspecie());
        animal.setRaca(dados.getRaca());
        animal.setDataNascimento(dados.getDataNascimento());

        dono.setNome(dados.getDono().getNome());
        dono.setTelefone(dados.getDono().getTelefone());
        dono.setEmail(dados.getDono().getEmail());

        return animalRepository.save(animal);
    }

    @Transactional
    public void excluir(Long id) {
        Animal animal = buscarPorId(id);
        animalRepository.delete(animal);
    }
}
