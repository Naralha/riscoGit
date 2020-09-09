package camada.dao;

import java.math.BigInteger;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import camada.entidade.ClienteExterno;
import camada.entidade.ComplianceExterno;
import camada.entidade.ComplianceInterno;
import camada.entidade.Empresa;
import camada.entidade.FornecedorExterno;
import camada.entidade.Funcionario;
import camada.entidade.MacroProcesso;
import camada.entidade.Organograma;
import camada.entidade.Processo;


public class Dao {

	protected static SessionFactory factory = new Configuration()
			.configure("hibernate.cfg.xml")
//			.addAnnotatedClass(Processo.class)
			.addAnnotatedClass(MacroProcesso.class)
//			.addAnnotatedClass(ClienteExterno.class)
//			.addAnnotatedClass(ComplianceExterno.class)
//			.addAnnotatedClass(FornecedorExterno.class)
//			.addAnnotatedClass(ComplianceInterno.class)
			.addAnnotatedClass(Funcionario.class)
			.addAnnotatedClass(Empresa.class)
			.addAnnotatedClass(Organograma.class)
//			.addAnnotatedClass(Sequencia.class)
			.buildSessionFactory();

	protected Session session = factory.getCurrentSession();
	
	
	protected  void iniciarOperacao(){
		session.beginTransaction();
	}
	
	protected  void finalizarOperacao() {
		
		session.getTransaction().commit();
		session.close();
	}
	
	//solucao mais feia do mundo pqp
	public long sequence() {
		BigInteger b = (BigInteger) session.createSQLQuery("select next value for Sequencia").uniqueResult();
		return b.longValue() ;
	}
	
}
