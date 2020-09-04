import { Funcionario } from './Funcionario'

export class Organograma {
  id: number;
  idEmpresa: number;
  nome: string;
  descricao: string;
  idPaiOrganograma: number;
  idUsuario: number;
  funcionarios: Funcionario[]
}
