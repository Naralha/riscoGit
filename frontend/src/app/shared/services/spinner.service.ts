import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(){
      this.spinner.show();
  }

  hideSpinner(){
      this.spinner.hide()
  }
}
