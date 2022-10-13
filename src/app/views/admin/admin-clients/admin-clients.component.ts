import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';

// Models
import { Accounts } from '../../../shared/accounts';

// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';

// Dialog
import { MatDialog } from '@angular/material/dialog';
import { AdminClientsFormComponent } from './admin-clients-form/admin-clients-form.component'

// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})

export class AdminClientsComponent implements OnInit {
  // Principal Properties
  _title: string = 'Mantenedor de Clientes';
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;

  // Mat Table
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();

  // Table Properties
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'actions'];

  // For TESTING
  tableData: Accounts[] = [
    { id: 1, nombre: 'Pablo 1', apellido: 'Veliz 1', edad: 10 },
    { id: 2, nombre: 'Pablo 2', apellido: 'Veliz 2', edad: 20 },
    { id: 3, nombre: 'Pablo 3', apellido: 'Veliz 3', edad: 30 },
    { id: 4, nombre: 'Pablo 4', apellido: 'Veliz 4', edad: 40 }    
  ];

  constructor(public dialog: MatDialog) {
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

  ExportPDF() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#principalTable' });
    doc.save(this._title + '.pdf')
  }

  openDialog(item: Accounts): void {
    const dialogRef = this.dialog.open(AdminClientsFormComponent, {
      data: item,
      width: '100%',
      position: { top: '3%' }
    });

    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
    });
  }

}
