import { Employee } from './employee';
import { Company } from './company';

export interface Organogram {
   id: number,
   company: Company,
   name: string,
   description: string,
   parentId: number,
   idUser: number,
   employees: Employee[]
}
