package scarpellini.jsf_test.web.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import scarpellini.jsf_test.domain.Veterinario;
import scarpellini.jsf_test.service.VeterinarioService;

import java.io.Serializable;
import java.util.List;

@Named("veterinarioBean")
@ViewScoped
public class VeterinarioBean implements Serializable {

    private static final long serialVersionUID = 1L;

    // Dependências
    @Inject
    private VeterinarioService veterinarioService;

    // Estado da tela
    @Getter
    private Veterinario veterinario;
    @Getter
    private List<Veterinario> veterinarios;
    @Getter
    private boolean editandoVeterinario;

    // Inicialização da página
    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    // Ações chamadas pela página
    public void novo() {
        veterinario = new Veterinario();
        this.editandoVeterinario = false;
    }

    public void salvar() {
        veterinarioService.salvar(veterinario);
        listar();
        novo();
    }

    public void editar(Veterinario veterinario) {
        this.editandoVeterinario = true;
        this.veterinario = veterinario;
    }

    public void excluir(Long id) {
        veterinarioService.excluir(id);
        listar();
    }

    // Dados usados pelos componentes da página
    public void listar() {
        veterinarios = veterinarioService.listarTodos();
    }
}
