package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Consulta;
import scarpellini.jsf_test.domain.Veterinario;
import scarpellini.jsf_test.repository.ConsultaRepository;

import java.util.List;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final AnimalService animalService;
    private final VeterinarioService veterinarioService;

    public ConsultaService(
            ConsultaRepository consultaRepository,
            AnimalService animalService,
            VeterinarioService veterinarioService
    ) {
        this.consultaRepository = consultaRepository;
        this.animalService = animalService;
        this.veterinarioService = veterinarioService;
    }

    @Transactional(readOnly = true)
    public List<Consulta> listarTodos() {
        return consultaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Consulta buscarPorId(Long id) {
        return consultaRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Consulta não encontrada: " + id
                        ));
    }

    @Transactional
    public Consulta salvar(Consulta consulta) {
        if (consulta.getDataHora() == null) {
            throw new IllegalArgumentException(
                    "A consulta precisa possuir data e hora"
            );
        }

        if (consulta.getAnimal() == null
                || consulta.getAnimal().getId() == null) {
            throw new IllegalArgumentException(
                    "A consulta precisa possuir um animal"
            );
        }

        if (consulta.getVeterinario() == null
                || consulta.getVeterinario().getId() == null) {
            throw new IllegalArgumentException(
                    "A consulta precisa possuir um veterinário"
            );
        }

        Animal animal =
                animalService.buscarPorId(consulta.getAnimal().getId());

        Veterinario veterinario =
                veterinarioService.buscarPorId(consulta.getVeterinario().getId());

        consulta.setAnimal(animal);
        consulta.setVeterinario(veterinario);

        return consultaRepository.save(consulta);
    }

    @Transactional
    public void excluir(Long id) {
        Consulta consulta = buscarPorId(id);
        consultaRepository.delete(consulta);
    }
}
