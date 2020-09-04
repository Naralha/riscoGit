import { Funcionario } from './Funcionario';

export interface TreeNode {
  id: number,
  text: string,
  parent: number,
  employees: Funcionario[]
}
