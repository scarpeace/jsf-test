package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Dono;
import scarpellini.jsf_test.repository.DonoRepository;

import java.util.List;

@Service
public class DonoService {

    private final DonoRepository donoRepository;

    public DonoService(DonoRepository donoRepository) {
        this.donoRepository = donoRepository;
    }

    @Transactional(readOnly = true)
    public List<Dono> listarTodos() {
        return donoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Dono buscarPorId(Long id) {
        return donoRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Dono não encontrado: " + id));
    }

    @Transactional
    public Dono salvar(Dono dono) {
        return donoRepository.save(dono);
    }

    @Transactional
    public void excluir(Long id) {
        Dono dono = buscarPorId(id);
        donoRepository.delete(dono);
    }
}
