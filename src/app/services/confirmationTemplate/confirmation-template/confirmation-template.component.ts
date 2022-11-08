import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-template',
  templateUrl: './confirmation-template.component.html',
  styleUrls: ['./confirmation-template.component.scss']
})
export class ConfirmationTemplateComponent implements OnInit {

  public title: string = '';
  public description: string = '';

  constructor(public dialogo: MatDialogRef<ConfirmationTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public obj_confirm: any) {
    this.title = obj_confirm.title ? obj_confirm.title : 'Se requiere su validación';
    this.description = obj_confirm.description ? obj_confirm.description : '¿Está seguro de completar esta acción?';
  }
  cerrarDialogo(flag: boolean): void {
    this.dialogo.close(flag);
  }
  ngOnInit(): void {
  }

}
