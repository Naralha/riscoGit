package camada.entidade;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import camada.dao.Dao;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "tbMacroProcesso")
public class MacroProcesso extends Dao{

	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarMacroProcesso", nullable = false)
	private long id;
	
	@Column(name = "nVarNomeMacroProcesso", nullable = false)
	private String nome;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="id_nVarEmpresa")
	private Empresa empresa;
	
	@Column(name = "id_nVarUsuario", nullable = false)
	private String idUsuario;
	
	public List<MacroProcesso> findAll(){
			
			iniciarOperacao();
			
			List<MacroProcesso> macroProcessos = new ArrayList<MacroProcesso>();
			macroProcessos = session.createQuery("SELECT a FROM MacroProcesso a Where a.empresa ='"+ this.empresa.getId()+"'", MacroProcesso.class).getResultList(); 
			
			finalizarOperacao();
			
			return macroProcessos;
	}
	
	
	public void salvar() {
		
			iniciarOperacao();
			
			setId(sequence());
			session.save(this);
			
			finalizarOperacao();
	
	} 
	
	public boolean deletar(){	
			
			iniciarOperacao();
			MacroProcesso macroProcesso = (MacroProcesso)session.load(MacroProcesso.class, this.id);
			session.delete(macroProcesso);
			
			finalizarOperacao();
			
			return true;
	} 
	
	public void atualizar() {
			
			iniciarOperacao();
			
			session.update(this);
			
			finalizarOperacao();
	}
}