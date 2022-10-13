import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Accounts } from 'src/app/shared/accounts';

@Component({
  selector: 'app-admin-clients-form',
  templateUrl: './admin-clients-form.component.html',
  styleUrls: ['./admin-clients-form.component.scss']
})

export class AdminClientsFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Accounts) { }

  ngOnInit(): void {
    console.log(this.data, 'modal');
  }

  closeMe(){
    this.dialogRef.close({caca:'si es caca', edad:10});
  } 
}
