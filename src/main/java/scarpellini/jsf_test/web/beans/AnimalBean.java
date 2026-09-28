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

    @Inject
    private AnimalService animalService;

    @Getter
    @Setter
    private AnimalRequest animalRequest;

    @Getter
    private List<AnimalResponse> animais;

    public Especie[] getEspecies() {
        return Especie.values();
    }

    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    public void listar() {
        animais = animalService.listarTodosComDono().stream()
                .map(AnimalResponse::toDto)
                .toList();
    }

    public void novo() {
        animalRequest = new AnimalRequest();
    }

    public void criar() {
        animalService.cadastrar(
                animalRequest.toEntity(),
                animalRequest.getDono().toEntity());
        listar();
        novo();
        FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_INFO, "Cadastro concluído", "Animal e dono cadastrados."));
    }
}
