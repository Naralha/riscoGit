import { Employee } from './employee';

export interface TreeNode {
  id: number,
  text: string,
  parent: number,
  employees: Employee[]
}
