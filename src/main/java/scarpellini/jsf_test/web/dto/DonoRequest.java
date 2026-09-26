package scarpellini.jsf_test.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.domain.Dono;

import java.io.Serializable;

@Getter
@Setter
public class DonoRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "Informe o nome do dono.")
    private String nome;

    private String telefone;

    @Email(message = "Informe um e-mail válido.")
    private String email;

    public Dono toEntity() {
        Dono dono = new Dono();
        dono.setNome(nome);
        dono.setTelefone(telefone);
        dono.setEmail(email);
        return dono;
    }
}
