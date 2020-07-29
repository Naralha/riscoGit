package camada.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import camada.entidade.Empresa;
import camada.entidade.Funcionario;
import camada.entidade.Organograma;

import java.math.BigInteger;

public class Dao {

	protected static SessionFactory factory = new Configuration()
			.configure("hibernate.cfg.xml")
			.addAnnotatedClass(Empresa.class).addAnnotatedClass(Funcionario.class).addAnnotatedClass(Organograma.class)
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
	protected long sequence() {
		BigInteger b = (BigInteger) session.createSQLQuery("select next value for Sequencia").uniqueResult();
		return b.longValue() ;
	}
}