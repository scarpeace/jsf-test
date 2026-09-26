package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Consulta;
import scarpellini.jsf_test.domain.Doutor;
import scarpellini.jsf_test.repository.ConsultaRepository;

import java.util.List;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final AnimalService animalService;
    private final DoutorService doutorService;

    public ConsultaService(
            ConsultaRepository consultaRepository,
            AnimalService animalService,
            DoutorService doutorService
    ) {
        this.consultaRepository = consultaRepository;
        this.animalService = animalService;
        this.doutorService = doutorService;
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

        if (consulta.getDoutor() == null
                || consulta.getDoutor().getId() == null) {
            throw new IllegalArgumentException(
                    "A consulta precisa possuir um doutor"
            );
        }

        Animal animal =
                animalService.buscarPorId(consulta.getAnimal().getId());

        Doutor doutor =
                doutorService.buscarPorId(consulta.getDoutor().getId());

        consulta.setAnimal(animal);
        consulta.setDoutor(doutor);

        return consultaRepository.save(consulta);
    }

    @Transactional
    public void excluir(Long id) {
        Consulta consulta = buscarPorId(id);
        consultaRepository.delete(consulta);
    }
}
