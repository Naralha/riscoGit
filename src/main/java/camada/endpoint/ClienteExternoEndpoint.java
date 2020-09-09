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

import camada.entidade.ClienteExterno;

@RestController
@CrossOrigin
@RequestMapping(value = "/clienteExterno")
public class ClienteExternoEndpoint {
	
	
	@GetMapping
	public ResponseEntity<List<ClienteExterno>> findAll(){
		ClienteExterno clienteExterno = new ClienteExterno();
		List<ClienteExterno> listaClienteExterno = new ArrayList<ClienteExterno>();
		listaClienteExterno.addAll(clienteExterno.findAll());
		
		return new ResponseEntity<List<ClienteExterno>>(listaClienteExterno, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<ClienteExterno> insert(@RequestBody ClienteExterno clienteExterno){

		clienteExterno.salvar(); 
		
		return new ResponseEntity<ClienteExterno>(clienteExterno, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<ClienteExterno> delete(@RequestBody ClienteExterno clienteExterno){
		
		clienteExterno.deletar();
		
		return new ResponseEntity<ClienteExterno>(clienteExterno, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<ClienteExterno> atualizar(@RequestBody ClienteExterno clienteExterno){
		
		clienteExterno.atualizar();
		
		return new ResponseEntity<ClienteExterno>(clienteExterno, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{nome}")
	public ResponseEntity<ClienteExterno> findByNome(@PathVariable(name = "nome") String nome){
		ClienteExterno clienteExterno = new ClienteExterno();
		clienteExterno.setNome(nome);
		
		
		return new ResponseEntity<ClienteExterno>(clienteExterno.findByNome(), HttpStatus.OK);
	}
}
