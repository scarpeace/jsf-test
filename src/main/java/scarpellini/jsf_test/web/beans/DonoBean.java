package scarpellini.jsf_test.web.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import scarpellini.jsf_test.domain.Dono;
import scarpellini.jsf_test.service.DonoService;

import java.io.Serializable;
import java.util.List;

@Named("donoBean")
@ViewScoped
public class DonoBean implements Serializable {

    private static final long serialVersionUID = 1L;

    @Inject
    private DonoService donoService;

    private Dono dono;
    private List<Dono> donos;

    @PostConstruct
    public void inicializar() {
        novo();
        listar();
    }

    public void listar() {
        donos = donoService.listarTodos();
    }

    public void novo() {
        dono = new Dono();
    }

    public void salvar() {
        donoService.salvar(dono);
        listar();
        novo();
    }

    public void editar(Dono dono) {
        this.dono = dono;
    }

    public void excluir(Long id) {
        donoService.excluir(id);
        listar();
    }

    public Dono getDono() {
        return dono;
    }

    public void setDono(Dono dono) {
        this.dono = dono;
    }

    public List<Dono> getDonos() {
        return donos;
    }
}
