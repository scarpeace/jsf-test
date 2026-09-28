package scarpellini.jsf_test.web.dto;

import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.domain.Dono;

import java.io.Serializable;

@Getter
@Setter
public class DonoResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String telefone;
    private String email;

    public static DonoResponse toDto(Dono dono) {
        DonoResponse dto = new DonoResponse();
        dto.setId(dono.getId());
        dto.setNome(dono.getNome());
        dto.setTelefone(dono.getTelefone());
        dto.setEmail(dono.getEmail());
        return dto;
    }
}
