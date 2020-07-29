package camada.entidade;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import camada.dao.Dao;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbEmpresa")
public class Empresa extends Dao {

    @Id
    @PrimaryKeyJoinColumn
    @Column(name = "id_nVarEmpresa", nullable = false)
    private Long id;

    @Column(name = "nVarNome", nullable = false)
    private String nome;

    @Column(name = "nVarDescricao", nullable = false)
    private String descricao;

    @JsonIgnore
    @OneToMany(mappedBy = "empresa")
    private Set<Organograma> organogramas;

    public void salvar() {
        iniciarOperacao();
        this.setId(sequence());
        session.save(this);
        finalizarOperacao();
    }

    public List<Empresa> findAll() {
        iniciarOperacao();
        List<Empresa> listaEmpresas = new ArrayList<Empresa>();
        listaEmpresas = session.createQuery("SELECT a FROM Empresa a", Empresa.class).getResultList();
        finalizarOperacao();
        return listaEmpresas;
    }

    public void deletar() {
        iniciarOperacao();
        Empresa empresa = (Empresa) session.load(Empresa.class, this.id);
        session.delete(empresa);
        finalizarOperacao();
    }

    public void atualizar() {
        iniciarOperacao();
        session.update(this);
        finalizarOperacao();
    }

    public Empresa findByNome() {
        iniciarOperacao();
        Empresa empresa = session.createQuery("SELECT a FROM Empresa a Where a.nome ='" + this.nome + "'", Empresa.class).getResultList().get(0);
        finalizarOperacao();
        return empresa;
    }

    public Empresa findById() {
        iniciarOperacao();
        try {
            Empresa empresa = session
                    .createQuery("SELECT a FROM Empresa a Where a.id ='" + this.id + "'", Empresa.class)
                    .getSingleResult();
            return empresa;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        } finally {
            finalizarOperacao();
        }
    }
}
