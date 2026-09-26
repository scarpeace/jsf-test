package scarpellini.jsf_test.web.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import scarpellini.jsf_test.domain.Doutor;
import scarpellini.jsf_test.service.DoutorService;

import java.io.Serializable;
import java.util.List;

@Named("doutorBean")
@ViewScoped
public class DoutorBean implements Serializable {

    private static final long serialVersionUID = 1L;

    @Inject
    private DoutorService doutorService;

    private Doutor doutor;
    private List<Doutor> doutores;

    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    public void listar() {
        doutores = doutorService.listarTodos();
    }

    public void novo() {
        doutor = new Doutor();
    }

    public void salvar() {
        doutorService.salvar(doutor);
        listar();
        novo();
    }

    public void editar(Doutor doutor) {
        this.doutor = doutor;
    }

    public void excluir(Long id) {
        doutorService.excluir(id);
        listar();
    }

    public Doutor getDoutor() {
        return doutor;
    }

    public void setDoutor(Doutor doutor) {
        this.doutor = doutor;
    }

    public List<Doutor> getDoutores() {
        return doutores;
    }
}
