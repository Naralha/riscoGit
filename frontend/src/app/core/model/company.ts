import { Organogram } from './organogram';
export class Company {
  id: number;
  name: string;
  description: string;
  organograms: Organogram[]

  constructor(id?: number, name?: string, description?: string, organograms?: Organogram[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.organograms = organograms;
  }

  static fromApiJSONData(obj: Object): Company {
    return Object.assign(new Company(), obj);
  }
}
