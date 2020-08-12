import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend';
  showPendingChanges() {

  }

  onActiveSidebar() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      if($("#sidebarCollapse svg").hasClass('feather-arrow-left')) {
        $("#sidebarCollapse svg.feather.feather-arrow-left")
        .replaceWith(Feather.icons['arrow-right'].toSvg());
      } else {
        $("#sidebarCollapse svg.feather.feather-arrow-right")
        .replaceWith(Feather.icons['arrow-left'].toSvg());
      }
    });
  }

  ngOnInit() {
    this.onActiveSidebar();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}
