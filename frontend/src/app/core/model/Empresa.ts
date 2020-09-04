import { Organograma } from './Organograma';

export interface Empresa {
  id: number;
  nome: string;
  descricao: string;
  organograma: Organograma[]
}
