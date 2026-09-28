package scarpellini.jsf_test.web.dto;

import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Especie;

import java.io.Serial;
import java.io.Serializable;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class AnimalResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private static final DateTimeFormatter FORMATO_DATA = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private Long id;
    private String nome;
    private Especie especie;
    private String raca;
    private String dataNascimento;
    private String nomeDono;

    public static AnimalResponse toDto(Animal animal) {
        AnimalResponse dto = new AnimalResponse();
        dto.setId(animal.getId());
        dto.setNome(animal.getNome());
        dto.setEspecie(animal.getEspecie());
        dto.setRaca(animal.getRaca());
        dto.setDataNascimento(animal.getDataNascimento() == null
                ? null
                : animal.getDataNascimento().format(FORMATO_DATA));
        dto.setNomeDono(animal.getDono().getNome());
        return dto;
    }
}
