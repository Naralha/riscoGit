package camada.endpoint;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import camada.entidade.Empresa;
import camada.entidade.Organograma;


@RestController
@CrossOrigin
@RequestMapping(value = "/organograma")
public class OrganogramaEndpoint {

    @GetMapping(value = "/{idEmpresa}")
    public ResponseEntity<List<Organograma>> findOrganogramaPorEmpresa(@PathVariable(value = "idEmpresa") Long idEmpresa) {
        Organograma organograma = new Organograma();
        Empresa empresa = new Empresa(idEmpresa);
        organograma.setEmpresa(empresa);
        List<Organograma> listaOrganograma = organograma.findOrganogramaPorEmpresa();
        return new ResponseEntity<>(listaOrganograma, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Organograma> insert(@RequestBody Organograma organograma) {
        organograma.salvar();
        return new ResponseEntity<Organograma>(organograma, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> iniciarDelete(@RequestBody Organograma organograma) {
        return new ResponseEntity<String>(organograma.iniciarDelete(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<Organograma> deletar(@RequestBody Organograma organograma) {
        organograma.deletar();
        return new ResponseEntity<Organograma>(organograma, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Organograma> atualizar(@RequestBody List<Organograma> organograma) {
        //organograma.atualizar();
        return new ResponseEntity<Organograma>((Organograma) null, HttpStatus.OK);
    }

    @GetMapping(value = "/montarArvore/{idEmpresa}")
    public ResponseEntity<String> montarArvore(@PathVariable(value = "idEmpresa") Long idEmpresa) {
        Organograma organograma = new Organograma();
        Empresa empresa = new Empresa(idEmpresa);
        organograma.setEmpresa(empresa);
        String arvore = organograma.montarArvore();
        return new ResponseEntity<>(arvore, HttpStatus.OK);
    }

    @GetMapping(value = "/sequence")
    public ResponseEntity<Long> retornaSequence() {
        Organograma organograma = new Organograma();
        return new ResponseEntity<>(organograma.retornaSequence(), HttpStatus.OK);
    }
}
