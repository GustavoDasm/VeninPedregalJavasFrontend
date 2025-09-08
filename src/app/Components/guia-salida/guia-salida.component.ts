import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Title } from "@angular/platform-browser";
import { DataService } from "src/app/Service/data.service";
import { DetalleGuia } from "src/app/Models/guiasalida/detguia/detalleguia";
import { AddGuiaSalidaComponent } from "./add-guia-salida/add-guia-salida.component";

@Component({
  selector: "app-guia-salida",
  templateUrl: "./guia-salida.component.html",
  styleUrls: ["./guia-salida.component.css"],
})
export class GuiaSalidaComponent implements OnInit {
  public suc: any;
  public tipo_filtro: number = 0;
  public filtro: any = {
    tipofecha: 0,
    top: 100,
    scale: "ASC",
    fec_ini: "",
    fec_fin: "",
    estado: "",
    tipocaja: "",
    establecimiento: this.data.getSucursalId(),
  };

  public detalleguias: DetalleGuia[] = [];

  displayedColumns: string[] = [
    "fecha",
    "cliente",
    "cantidad",
    "precio",
    "total",
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
    this.titleService.setTitle("Cargada Estribor | Sistema Venin");

    this.dataSource = new MatTableDataSource(this.operaciones);
  }

  ngOnInit() {
    this.GetSucursal();
    this.getDetalleGuia();
  }

  GetSucursal() {
    this.data.getSucursalObj().subscribe(
      (res) => {
        this.suc = res;
      },
      (error) => {}
    );
  }

  getDetalleGuia() {
    this.data.GetSimple(this.data.api.detalleguia).subscribe((r) => {
      this.detalleguias = r;
      this.dataSource.data = r;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addGuiaSalida() {
    const dialogRef = this.dialog.open(AddGuiaSalidaComponent, {
      width: "90vw",
      maxWidth: "1000px",
    });
  } 
}
