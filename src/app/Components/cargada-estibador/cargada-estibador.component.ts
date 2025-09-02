import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { Cliente } from "src/app/Models/cliente/cliente";
import { DataService } from "src/app/Service/data.service";
import { SelectOperacionComponent } from "../caja-efectivo/select-operacion/select-operacion.component";

@Component({
  selector: "app-cargada-estibador",
  templateUrl: "./cargada-estibador.component.html",
  styleUrls: ["./cargada-estibador.component.css"],
})
export class CargadaEstibadorComponent implements OnInit {
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

  public clientes: Cliente[] = [];
  displayedColumns: string[] = [
    "establecimiento",
    "fecha",
    "hora",
    "personal",
    "referencia",
    "tipocaja",
    "importe",
    "estado",
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
  }

  GetSucursal() {
    this.data.getSucursalObj().subscribe(
      (res) => {
        this.suc = res;
      },
      (error) => {}
    );
  }

  getClientes() {
    this.data.GetSimple(this.data.api.cliente).subscribe((r) => {
      this.clientes = r;
    });
  }

  selectOperacion() {
    const dialogRef = this.dialog.open(SelectOperacionComponent, {
      width: "90vw",
      maxWidth: "400px",
    });
  }
}
