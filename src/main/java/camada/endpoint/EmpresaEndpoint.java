package camada.endpoint;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import camada.entidade.Empresa;

@RestController
@CrossOrigin
@RequestMapping(value = "/empresa")
public class EmpresaEndpoint {
	
	
	@GetMapping
	public ResponseEntity<List<Empresa>> findAll(){
		Empresa empresa = new Empresa();
		List<Empresa> listaEmpresa = new ArrayList<Empresa>();
		listaEmpresa.addAll(empresa.findAll());
		
		return new ResponseEntity<List<Empresa>>(listaEmpresa, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Empresa> insert(@RequestBody Empresa empresa){

		empresa.salvar(); 
		
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Empresa> delete(@RequestBody Empresa empresa){
		
		empresa.deletar();
		
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Empresa> atualizar(@RequestBody Empresa empresa){
		
		empresa.atualizar();
		
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}
	
//	@GetMapping(value = "/{nome}")
//	public ResponseEntity<Empresa> findByNome(@PathVariable(name = "nome") String nome){
//		Empresa empresa = new Empresa();
//		empresa.setNome(nome);
//
//
//		return new ResponseEntity<Empresa>(empresa.findByNome(), HttpStatus.OK);
//	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> findById(@PathVariable long id) {
		Empresa empresa = new Empresa();
		empresa.setId(id);
		empresa = empresa.findById();
		if (empresa == null) {
			return new ResponseEntity<>("Empresa não encontrada", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(empresa, HttpStatus.OK);
	}
}
