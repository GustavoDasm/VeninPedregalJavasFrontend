import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AFPS } from 'src/app/Models/afps/afps';
import { DataService } from 'src/app/Service/data.service';
import { AddTasaAfpsComponent } from './add-tasa-afps/add-tasa-afps.component';

@Component({
  selector: 'app-afps',
  templateUrl: './afps.component.html',
  styleUrls: ['./afps.component.css']
})
export class AfpsComponent implements OnInit {

  public afps: AFPS[] = [];
  displayedColumns: string[] = [
    "idafps",
    "nombre",
    "acciones",
  ];

  dataSource: MatTableDataSource<any>;
  operaciones: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private data: DataService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle("AFPS | Sistema Venin");
    this.dataSource = new MatTableDataSource(this.operaciones);
  }

  ngOnInit() {
    this.getAFPS();
  }

  getAFPS() {
    this.data.GetSimple(this.data.api.afps).subscribe((r) => {
      this.afps = r;
      this.dataSource.data = r; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectOperacion() {
    this.dialog.open(AddTasaAfpsComponent, {
      width: "90vw",
      maxWidth: "1000px",
    });
  }

}
