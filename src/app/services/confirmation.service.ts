import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationTemplateComponent } from '../services/confirmationTemplate/confirmation-template/confirmation-template.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(public dialog: MatDialog) {

  }

  confirmation(title?: string, description?: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const dialogRef = this.dialog.open(ConfirmationTemplateComponent, {
        data: { title: title, description: description }
      });
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    })
  }
}
