import { Component, OnInit } from '@angular/core';
import { NodoService } from 'src/app/services/nodo.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  _data : any[];

  constructor(private _service: NodoService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
     this._service.getDynamo().subscribe({
      next: (data) => {
        console.log(data);
        this._data = data;
      },
      error: (e) => console.log('ERROR')
    });
  }

}
