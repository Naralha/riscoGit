import { Organograma } from './Organograma';

export class Funcionario {
  id: number;
  nome: string;
  email: string;
  descricao: string;
  idEmpresa: number;
  idUser: number;
  idOrganograma: number;
  organograma: Organograma;
}
