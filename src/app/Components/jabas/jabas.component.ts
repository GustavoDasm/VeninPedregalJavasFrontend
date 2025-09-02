import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { Cliente } from "src/app/Models/cliente/cliente";
import { DataService } from "src/app/Service/data.service";
import { SelectOperacionComponent } from "../caja-efectivo/select-operacion/select-operacion.component";
import { GuiaSalida } from "src/app/Models/guiasalida/guiasalida";
import { Detguia } from "src/app/Models/guiasalida/detguia/detguia";

@Component({
  selector: 'app-jabas',
  templateUrl: './jabas.component.html',
  styleUrls: ['./jabas.component.css']
})
export class JabasComponent implements OnInit {

  public suc: any;
  public tipo_filtro: number = 0;
  public filtro: any = {
    tipofecha: 0,
    top: 100,
    scale: "ASC",
    fec_ini: "",
    fec_fin: "",
    estado: "",
    tipocaja: ""
  };

  public guiaSalida: GuiaSalida[] = [];
  public detalleGuia: Detguia[] = [];
  public clientes: Cliente[] = [];
  displayedColumns: string[] = [
    "fecha",
    "cliente",
    "producto",
    "precio",
    "total",
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
    this.titleService.setTitle("Jabas | Sistema Venin");
    this.dataSource = new MatTableDataSource(this.operaciones);
  }

  ngOnInit() {
    this.getGuiaSalida();
    this.getClientes();
  }

  getClientes() {
    this.data.GetSimple(this.data.api.cliente).subscribe(r => { this.clientes = r; })
  }

  getGuiaSalida() {
    this.data.GetSimple(this.data.api.guiasalida).subscribe((r) => {
      this.guiaSalida = r;
      this.dataSource.data = r; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectOperacion() {
    const dialogRef = this.dialog.open(SelectOperacionComponent, {
      width: "90vw",
      maxWidth: "400px",
    });
  }

}
