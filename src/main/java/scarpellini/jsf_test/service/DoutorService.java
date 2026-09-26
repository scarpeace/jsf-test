package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Doutor;
import scarpellini.jsf_test.repository.DoutorRepository;

import java.util.List;

@Service
public class DoutorService {

    private final DoutorRepository doutorRepository;

    public DoutorService(DoutorRepository doutorRepository) {
        this.doutorRepository = doutorRepository;
    }

    @Transactional(readOnly = true)
    public List<Doutor> listarTodos() {
        return doutorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Doutor buscarPorId(Long id) {
        return doutorRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Doutor não encontrado: " + id));
    }

    @Transactional
    public Doutor salvar(Doutor doutor) {
        return doutorRepository.save(doutor);
    }

    @Transactional
    public void excluir(Long id) {
        Doutor doutor = buscarPorId(id);
        doutorRepository.delete(doutor);
    }
}
