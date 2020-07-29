import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organograma-detail',
  templateUrl: './organograma-detail.component.html',
  styleUrls: ['./organograma-detail.component.css']
})
export class OrganogramaDetailComponent implements OnInit {

  idOrgNode: number;
  nameNode: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => {
        this.idOrgNode = params['id'];
        this.nameNode = params['name'];
      }
    );
  }
}
