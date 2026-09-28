package scarpellini.jsf_test.web.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.service.DonoService;
import scarpellini.jsf_test.web.dto.DonoRequest;
import scarpellini.jsf_test.web.dto.DonoResponseDto;

import java.io.Serializable;
import java.util.List;

@Named("donoBean")
@ViewScoped
public class DonoBean implements Serializable {

    private static final long serialVersionUID = 1L;

    @Inject
    private DonoService donoService;

    @Setter
    @Getter
    private DonoRequest donoRequest;
    @Getter
    private List<DonoResponseDto> donos;

    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    public void listar() {
        donos = donoService.listarTodos().stream()
                .map(DonoResponseDto::toDto)
                .toList();
    }

    public void novo() {
        donoRequest = new DonoRequest();
    }

    public void criar() {
        donoService.criar(donoRequest.toEntity());
        concluirOperacao();
    }

    public void atualizar() {
        donoService.atualizar(donoRequest.getId(), donoRequest.toEntity());
        concluirOperacao();
    }

    private void concluirOperacao() {
        listar();
        novo();
    }

    public void editar(DonoResponseDto dono) {
        donoRequest = new DonoRequest();
        donoRequest.setId(dono.getId());
        donoRequest.setNome(dono.getNome());
        donoRequest.setTelefone(dono.getTelefone());
        donoRequest.setEmail(dono.getEmail());
    }

    public void excluir(Long id) {
        donoService.excluir(id);
        listar();
    }

}
