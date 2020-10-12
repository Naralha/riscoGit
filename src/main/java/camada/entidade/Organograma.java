package camada.entidade;

import java.util.*;

import javax.persistence.*;

import camada.dao.Dao;
import camada.exceptions.EntityNotFoundException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "tbOrganograma")
public class Organograma extends Dao {


    @Id
    @PrimaryKeyJoinColumn
    @Column(name = "id_nVarOrganograma", nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_nVarEmpresa")
    private Empresa empresa;

    @Column(name = "nVarNome", nullable = false)
    private String nome;

    @Column(name = "nVarDescricao", nullable = false)
    private String descricao;

    @Column(name = "id_nVarPaiOrganograma")
    private Long idPaiOrganograma;

    //montar relacionamento com tabela usuario
    @Column(name = "id_nvarUsuario")
    private String idUsuario;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tbFuncionarioOrganograma",
            joinColumns = {@JoinColumn(name = "id_nVarOrganograma")},
            inverseJoinColumns = {@JoinColumn(name = "id_nVarFuncionario")}
    )
    private Set<Funcionario> funcionarios;

//	@OneToMany(mappedBy = "organograma", targetEntity = Processo.class, fetch = FetchType.LAZY)
//	private Processo processo;

    public void salvar() {

        iniciarOperacao();

        setId(sequence());
        session.save(this);

        finalizarOperacao();

    }

    public List<Organograma> find() {

        iniciarOperacao();

        List<Organograma> listaOrganogramas = new ArrayList<Organograma>();
        listaOrganogramas = session.createQuery("SELECT a FROM Organograma a", Organograma.class).getResultList();

        finalizarOperacao();

        return listaOrganogramas;
    }

    public List<Organograma> findOrganogramaPorEmpresa() {

        iniciarOperacao();

        List<Organograma> listaOrganograma = session.createQuery("SELECT a FROM Organograma a Where a.empresa ='"
                + this.empresa.getId() + "'", Organograma.class).getResultList();

        finalizarOperacao();

        if (listaOrganograma.isEmpty()) {
            throw new EntityNotFoundException(Organograma.class, "id", this.empresa.getId().toString());
        }

        return listaOrganograma;
    }

    public String iniciarDelete() {

        iniciarOperacao();

        //validacao se tem relacionamento com id_pai
        List<Organograma> listaOrganogramas = new ArrayList<Organograma>();
        listaOrganogramas = session.createQuery("SELECT a FROM Organograma a where a.idPaiOrganograma ='" + this.id + "'", Organograma.class).getResultList();

        //Se tiver filho, o usuario deve alterar na m�o.
        if (listaOrganogramas.isEmpty()) {
            Organograma organograma = (Organograma) session.load(Organograma.class, this.id);

//			o usu�rio tem a chance de escolher se quer deletar mesmo com funcionario associado.
            if (!organograma.getFuncionarios().isEmpty()) {
                finalizarOperacao();
                return "Existe funcionario associado.";
            } else {
                session.delete(organograma);
                finalizarOperacao();
                return "Deletado.";
            }
        }

        finalizarOperacao();

        return "Existe filho associado.";
    }

    public boolean deletar() {

        iniciarOperacao();

        Organograma organograma = (Organograma) session.load(Organograma.class, this.id);

        session.createSQLQuery("Delete tbFuncionarioOrganograma where id_nVarOrganograma ='" + this.id + "'").executeUpdate();
        session.delete(organograma);

        finalizarOperacao();
        return true;
    }

    public void atualizar() {

        iniciarOperacao();

        session.update(this);

        finalizarOperacao();

    }

    public String montarArvore() {
        StringBuilder arvore = new StringBuilder("[");
        List<Organograma> listaOrganograma = findOrganogramaPorEmpresa();
        if (!listaOrganograma.isEmpty()) {
            Iterator<Organograma> it = listaOrganograma.iterator();
            while (it.hasNext()) {
                Organograma o = it.next();
                String idPai = o.getIdPaiOrganograma() == null ? "\"#\"" : Long.toString(o.getIdPaiOrganograma());
                StringBuilder funcionarios = new StringBuilder("[");
                if (o.getFuncionarios().size() > 0) {
                    Iterator<Funcionario> funcionarioIterator = o.getFuncionarios().iterator();
                    while (funcionarioIterator.hasNext()) {
                        Funcionario funcionario = funcionarioIterator.next();
                        funcionarios
                                .append("{")
                                .append("\"id\":")
                                .append(funcionario.getId())
                                .append(",\"nome\":\"")
                                .append(funcionario.getNome())
                                .append("\",\"idOrganograma\":")
                                .append(funcionario.getOrganograma().getId())
                                .append("}");
                        if (funcionarioIterator.hasNext()) {
                            funcionarios.append(",");
                        }
                    }
                }
                funcionarios.append("]");
                arvore.append("{")
                        .append("\"id\":")
                        .append(o.getId())
                        .append(",\"text\":\"")
                        .append(o.getNome())
                        .append("\",\"parent\":")
                        .append(idPai)
                        .append(",\"employees\":")
                        .append(funcionarios)
                        .append("}");
                if (it.hasNext()) {
                    arvore.append(",");
                }
            }
        }
        arvore.append("]");
        return arvore.toString();
    }

    public long retornaSequence() {
        iniciarOperacao();
        long sequence = sequence();
        finalizarOperacao();
        return sequence;
    }
}
