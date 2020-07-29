import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.css']
})
export class ProcessoComponent implements OnInit {

  @Input()
  showNewProcessButton: boolean = true;

  constructor(private router: Router) { }

  onGotoFormPage() : void {
    this.router.navigate(['processo/novo']);
  }

  ngOnInit(): void {
  
  }
}
