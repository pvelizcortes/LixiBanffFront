import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from '../constants/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastr: ToastrService) {

  }
  // PROCESS ERRORS
  processError(e: any) {
    const level = e.error.level ? e.error.level : "error";
    if (level == "error") {
      this.alertError(e.error.message);
    }
    else if (level == "warning") {
      this.alertWarning(e.error.message);
    }
  }

  // ALERTS
  alertSuccess(message: string, title?: string,) {
    this.toastr.success(message, title ? title : GlobalConstants.successToast);
  }

  alertWarning(message: string, title?: string,) {
    this.toastr.warning(message, title ? title : GlobalConstants.warningToast);
  }

  alertError(message: string, title?: string,) {
    this.toastr.error(message, title ? title : GlobalConstants.errorToast);
  }

  // MAPS
  convertToLatLng(lat: number, lng: number) {
     
  }
}
