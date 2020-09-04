import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/core/model/Funcionario';

@Component({
  selector: 'app-organograma-detail',
  templateUrl: './organograma-detail.component.html',
  styleUrls: ['./organograma-detail.component.css']
})
export class OrganogramaDetailComponent implements OnInit {

  idOrgNode: number;
  nameNode: string;
  employees: Funcionario[];
  subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => {
        this.idOrgNode = params['id'];
        this.nameNode = params['name'];
      }
    );

    // this.subscription = this.route.data.subscribe(
    //   (info: {funcionarios: Funcionario[]}) => {
    //     console.log('Recebendo funcionários do resolver');
    //     console.log(info.funcionarios)
    //     this.employees = info.funcionarios;
    //   }
    // );
  }
}
