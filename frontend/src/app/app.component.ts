import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend';
  //showAlertChanges: boolean = false;
  publisherSubscription: any;
  loggedIn: boolean = true;

  constructor() {}

  onActiveSidebar() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      if ($('#sidebarCollapse svg').hasClass('feather-arrow-left')) {
        $('#sidebarCollapse svg.feather.feather-arrow-left').replaceWith(
          Feather.icons['arrow-right'].toSvg()
        );
      } else {
        $('#sidebarCollapse svg.feather.feather-arrow-right').replaceWith(
          Feather.icons['arrow-left'].toSvg()
        );
      }
    });
  }

  ngOnInit() {
    this.onActiveSidebar();
    // this.publisherSubscription = this.publisherService
    //   .getInstance()
    //   .subscribe((data: string) => {
    //     if (data === 'pending_changes') {
    //       this.showAlertChanges = true;
    //       localStorage.setItem('@Risco:pending_changes', JSON.stringify(true));
    //     }
    //   });

    // const pending_changes = localStorage.getItem('@Risco:pending_changes');
    // if (pending_changes) this.showAlertChanges = true;
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}
