import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalConstants } from '../../../constants/global-constants';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss']
})
export class AdminAccountsComponent implements OnInit {
  // Principal Properties
  _title: string = 'Mantenedor de Clientes';
  _createName: string = GlobalConstants.createButtonName;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _pageSizeOptions : number[] = GlobalConstants.pageSizeOptions;

  // Table Properties
  _searchText: string = GlobalConstants.searchPlaceHolder;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad'];
  @ViewChild('tableSort') tableSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();

  // TESTING
  tableData: any[] = [
    { 'id': 1, 'nombre': 'Pablo 1', 'apellido': 'Veliz 1', 'edad': 10 },
    { 'id': 2, 'nombre': 'Pablo 2', 'apellido': 'Veliz 2', 'edad': 20 },
    { 'id': 3, 'nombre': 'Pablo 3', 'apellido': 'Veliz 3', 'edad': 30 },
    { 'id': 4, 'nombre': 'Pablo 4', 'apellido': 'Veliz 4', 'edad': 40 },
    { 'id': 5, 'nombre': 'Pablo 5', 'apellido': 'Veliz 5', 'edad': 50 },
    { 'id': 6, 'nombre': 'Pablo 1', 'apellido': 'Veliz 1', 'edad': 10 },
    { 'id': 7, 'nombre': 'Pablo 2', 'apellido': 'Veliz 2', 'edad': 20 },
    { 'id': 8, 'nombre': 'Pablo 3', 'apellido': 'Veliz 3', 'edad': 30 },
    { 'id': 9, 'nombre': 'Pablo 4', 'apellido': 'Veliz 4', 'edad': 40 },
    { 'id': 10, 'nombre': 'Pablo 5', 'apellido': 'Veliz 5', 'edad': 50 },
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
