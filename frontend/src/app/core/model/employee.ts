export class Employee {
  id: number;
  name: string;
  email: string;
  description: string;
  idCompany: number;
  idUser: number;
  idSectorCompany: number;

  deserialize(employee: any): Employee {
    const deserialized: Employee = new Employee();
    deserialized.id = employee.id;
    deserialized.name = employee.nome;
    deserialized.email = employee.email;
    deserialized.description = employee.descricao;
    deserialized.idCompany = employee.idEmpresa;
    deserialized.idUser = employee.idUser;
    deserialized.idSectorCompany = employee.idSetorEmpresa;
    return deserialized;
  }
}
