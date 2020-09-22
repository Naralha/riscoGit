import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
} from '@angular/core';
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

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    Feather.replace();
  }
}
