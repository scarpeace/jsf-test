package scarpellini.jsf_test.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import scarpellini.jsf_test.domain.Veterinario;
import scarpellini.jsf_test.repository.VeterinarioRepository;

import java.util.List;

@Service
public class VeterinarioService {

    private final VeterinarioRepository veterinarioRepository;

    public VeterinarioService(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    @Transactional(readOnly = true)
    public List<Veterinario> listarTodos() {
        return veterinarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Veterinario buscarPorId(Long id) {
        return veterinarioRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Veterinário não encontrado: " + id));
    }

    @Transactional
    public Veterinario salvar(Veterinario veterinario) {
        return veterinarioRepository.save(veterinario);
    }

    @Transactional
    public void excluir(Long id) {
        Veterinario veterinario = buscarPorId(id);
        veterinarioRepository.delete(veterinario);
    }
}
