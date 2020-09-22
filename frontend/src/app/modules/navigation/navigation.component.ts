import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loggedIn: boolean = true;
  sideBarIsOpen: boolean = true;

  constructor() { }

  onActiveSidebar() {
    $('#sidebar').toggleClass('active');
    this.sideBarIsOpen = !this.sideBarIsOpen;
  }

  ngOnInit(): void {
  }

}
