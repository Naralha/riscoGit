package camada.endpoint;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import camada.entidade.Empresa;
import camada.entidade.MacroProcesso;


@RestController
@CrossOrigin
@RequestMapping(value = "/macroProcesso")
public class MacroProcessoEndpoint {

	@GetMapping
	public ResponseEntity<List<MacroProcesso>> findMacroProcessoPorEmpresa(@RequestBody Empresa empresa){
		MacroProcesso macroProcesso = new MacroProcesso();
		macroProcesso.setEmpresa(empresa);
		
		List<MacroProcesso> listaOrganograma = macroProcesso.findAll();
		
		return new ResponseEntity<List<MacroProcesso>>(listaOrganograma, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<MacroProcesso> insert(@RequestBody MacroProcesso macroProcesso){
		macroProcesso.salvar(); 
		return new ResponseEntity<MacroProcesso>(macroProcesso, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<MacroProcesso> iniciarDelete(@RequestBody MacroProcesso macroProcesso){
		macroProcesso.deletar();
		return new ResponseEntity<MacroProcesso>(macroProcesso, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<MacroProcesso> atualizar(@RequestBody MacroProcesso macroProcesso){
		macroProcesso.atualizar();
		return new ResponseEntity<MacroProcesso>(macroProcesso, HttpStatus.OK);
	}
	
	
}
