package scarpellini.jsf_test.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import scarpellini.jsf_test.domain.Animal;
import scarpellini.jsf_test.domain.Especie;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
public class AnimalRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Informe o nome do animal.")
    private String nome;

    @NotNull(message = "Informe a espécie do animal.")
    private Especie especie;

    private String raca;
    private LocalDate dataNascimento;

    @Valid
    @NotNull(message = "Informe os dados do dono.")
    private DonoRequest dono = new DonoRequest();

    public static AnimalRequest fromEntity(Animal animal) {
        AnimalRequest request = new AnimalRequest();
        request.setNome(animal.getNome());
        request.setEspecie(animal.getEspecie());
        request.setRaca(animal.getRaca());
        request.setDataNascimento(animal.getDataNascimento());

        DonoRequest donoRequest = new DonoRequest();
        donoRequest.setNome(animal.getDono().getNome());
        donoRequest.setTelefone(animal.getDono().getTelefone());
        donoRequest.setEmail(animal.getDono().getEmail());
        request.setDono(donoRequest);

        return request;
    }

    public Animal toEntity() {
        return new Animal(
                this.getNome(),
                this.getEspecie(),
                this.getRaca(),
                this.getDataNascimento(),
                this.dono.toEntity()
        );
    }
}
