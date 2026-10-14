package scarpellini.jsf_test.web.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.domain.Especie;
import scarpellini.jsf_test.service.AnimalService;
import scarpellini.jsf_test.web.dto.AnimalRequest;
import scarpellini.jsf_test.web.dto.AnimalResponse;

import java.io.Serializable;
import java.util.List;

@Named("animalBean")
@ViewScoped
public class AnimalBean implements Serializable {

    private static final long serialVersionUID = 1L;

    // Dependências
    @Inject
    private AnimalService animalService;

    // Estado da tela
    @Getter
    @Setter
    private AnimalRequest animalRequest;

    @Getter
    private List<AnimalResponse> animais;

    @Getter
    private boolean editandoAnimal;

    private Long animalIdEmEdicao;

    // Inicialização da página
    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    // Ações chamadas pela página
    public void novo() {
        animalRequest = new AnimalRequest();
        animalIdEmEdicao = null;
        editandoAnimal = false;
    }

    public void editar(Long id) {
        animalRequest = AnimalRequest.fromEntity(animalService.buscarPorIdComDono(id));
        animalIdEmEdicao = id;
        editandoAnimal = true;
    }

    public void salvar() {
        boolean estavaEditando = editandoAnimal;
        if (estavaEditando) {
            animalService.atualizar(animalIdEmEdicao, animalRequest.toEntity());
        } else {
            animalService.cadastrar(animalRequest.toEntity());
        }

        listar();
        novo();
        FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_INFO,
                        estavaEditando ? "Atualização concluída" : "Cadastro concluído",
                        estavaEditando ? "Animal e dono atualizados." : "Animal e dono cadastrados."));
    }

    // Dados usados pelos componentes da página
    public void listar() {
        animais = animalService.listarTodosComDono().stream()
                .map(AnimalResponse::toDto)
                .toList();
    }

    public Especie[] getEspecies() {
        return Especie.values();
    }
}
