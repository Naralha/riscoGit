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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import camada.entidade.FornecedorExterno;

@RestController
@CrossOrigin
@RequestMapping(value = "/fornecedorExterno")
public class FornecedorExternoEndpoint {
	
	
	@GetMapping
	public ResponseEntity<List<FornecedorExterno>> findAll(){
		FornecedorExterno fornecedorExterno = new FornecedorExterno();
		List<FornecedorExterno> listaFornecedorExterno = new ArrayList<FornecedorExterno>();
		listaFornecedorExterno.addAll(fornecedorExterno.findAll());
		
		return new ResponseEntity<List<FornecedorExterno>>(listaFornecedorExterno, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<FornecedorExterno> insert(@RequestBody FornecedorExterno fornecedorExterno){

		fornecedorExterno.salvar(); 
		
		return new ResponseEntity<FornecedorExterno>(fornecedorExterno, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<FornecedorExterno> delete(@RequestBody FornecedorExterno fornecedorExterno){
		
		fornecedorExterno.deletar();
		
		return new ResponseEntity<FornecedorExterno>(fornecedorExterno, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<FornecedorExterno> atualizar(@RequestBody FornecedorExterno fornecedorExterno){
		
		fornecedorExterno.atualizar();
		
		return new ResponseEntity<FornecedorExterno>(fornecedorExterno, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{nome}")
	public ResponseEntity<FornecedorExterno> findByNome(@PathVariable(name = "nome") String nome){
		FornecedorExterno fornecedorExterno = new FornecedorExterno();
		fornecedorExterno.setNome(nome);
		
		
		return new ResponseEntity<FornecedorExterno>(fornecedorExterno.findByNome(), HttpStatus.OK);
	}
}
