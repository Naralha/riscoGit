import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private instance = new Subject<boolean>();

  instance$ = this.instance.asObservable();

  showAlertPendingChanges(show: boolean) {
    this.instance.next(show);
  }
}
