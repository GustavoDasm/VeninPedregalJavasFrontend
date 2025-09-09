import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import * as moment from "moment";
import { Cliente } from "src/app/Models/cliente/cliente";
import { DetallePago } from "src/app/Models/detallepago/detallepago";
import { Detguia } from "src/app/Models/guiasalida/detguia/detguia";
import { Sucursal } from "src/app/Models/sucursal/sucursal";
import { Transportista } from "src/app/Models/transportista/transportista";
import { DataService } from "src/app/Service/data.service";

@Component({
  selector: "app-add-guia-salida",
  templateUrl: "./add-guia-salida.component.html",
  styleUrls: ["./add-guia-salida.component.css"],
})
export class AddGuiaSalidaComponent implements OnInit {
  loadingClientes = false;
  loadingTransportistas = false;
  guiaSalidaForm: FormGroup;
  today = new Date();
  currentTime = new Date();
  cliente: Cliente[] = [];
  transportista: Transportista[] = [];
  sucursales: Sucursal[] = [];
  detVenta: Detguia[] = [];
  detPago: DetallePago[] = [];
  ventaColumns: string[] = [
    "producto",
    "cantidad",
    "precio",
    "total",
    "acciones",
  ];

  pagoColumns: string[] = ["fecha", "referencia", "total", "acciones"];

  search_clientes = {
    top: 100,
    scale: "ASC",
    apellidos: "",
  };

  search_transportistas = {
    top: 100,
    scale: "ASC",
    apellidos: "",
  };  

  dataSourceVentas: MatTableDataSource<any>;
  dataSourcePagos: MatTableDataSource<any>;
  operacionesVentas: any[] = [];
  operacionesPagos: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private dialogRef: MatDialogRef<AddGuiaSalidaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataForm: any
  ) {
    this.dataSourceVentas = new MatTableDataSource(this.operacionesVentas);
    this.dataSourcePagos = new MatTableDataSource(this.operacionesPagos);

    this.guiaSalidaForm = this.fb.group({
      id: [null],
      fecha_guia: [moment().format("YYYY-MM-DD"), Validators.required],
      hora: [moment().format("HH:mm"), Validators.required],
      cliente: [null, Validators.required],
      transportista: [null, Validators.required],
      sucursal: [null, Validators.required],
      referencia_guia: ["", [Validators.maxLength(40)]],
      producto: ["", [Validators.required, Validators.maxLength(25)]],
      cantidad: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      precio: [
        null,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
      total_venta: [
        null,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
      fecha_pago: [moment().format("YYYY-MM-DD"), Validators.required],
      referencia_pago: ["", [Validators.maxLength(20)]],
      importe: [
        null,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Actualizar hora cada segundo
    this.getDetVentas();
    this.getDetPagos();
    this.getSucursales();
    console.log("Formulario creado:", this.guiaSalidaForm.value);
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

/*     if (this.dataForm?.id) {
      this.data.GetById("guia_salida", this.dataForm.id).subscribe(res => {
        this.guiaSalidaForm.patchValue(res);
    })} */
  }
  getDetVentas() {
    this.data.GetSimple(this.data.api.detguia).subscribe((r) => {
      this.detVenta = r;
      this.dataSourceVentas.data = r;
      this.dataSourceVentas.sort = this.sort;
      this.dataSourceVentas.paginator = this.paginator;
    });
  }

  getDetPagos() {
    this.data.GetSimple(this.data.api.detallepago).subscribe((r) => {
      this.detPago = r;
      this.dataSourcePagos.data = r;
      this.dataSourcePagos.sort = this.sort;
      this.dataSourcePagos.paginator = this.paginator;
    });
  }

  getSucursales() {
    this.data.GetSimple(this.data.api.sucursal).subscribe(
      (res: any[]) => {
        this.sucursales = res;
      },
      (err) => {
        console.error("Error cargando sucursales", err);
      }
    );
  }

/*   saveEmpleado(empleado: any): void {
    this.data.Post("empleado", empleado).subscribe(
      (res) => {
        console.log("Empleado guardado:", res);
        this.dialogRef.close(res);
      },
      (error) => {
        console.error("Error al guardar el empleado:", error);
      }
    );
  } */

  onSearchCliente(term: string) {
    // opcional: filtrar si term es muy corto
    console.log("Buscando cliente con término:", term);
    if (!term || term.length < 2) {
      this.cliente = [];
      console.log("Término muy corto, limpiando lista de clientes.");
      return;
    }
    const searchPayload = { apellidos: term };  // o el campo que uses en backend para filtrar
    this.search_cliente(searchPayload);
  }

  search_cliente(searchParams: any) {
    this.loadingClientes = true;
    console.log("Enviando búsqueda con parámetros:", searchParams);

    this.data.Post("search_cliente", searchParams).subscribe(
      (r) => {
        this.loadingClientes = false;
        console.log("Respuesta del servidor:", r);
        if (!r || r.message !== "success") {
          console.error("Error en respuesta del backend:", r);
          this.cliente = [];
        } else {
          const items = r.data.map((item) => ({
            ...item,
            apellidoscompleto: item.apellidos || 'Sin nombre',
          }));
          console.log("Clientes formateados:", items);
          this.cliente = items;
        }
      },
      (e) => {
        this.loadingClientes = false;
        this.cliente = [];
        console.error("Error HTTP al buscar cliente:", e);
      }
    );
  }

  onSearchTransportista(term: string) {
    // opcional: filtrar si term es muy corto
    console.log("Buscando transportista con término:", term);
    if (!term || term.length < 2) {
      this.transportista = [];
      console.log("Término muy corto, limpiando lista de transportistas.");
      return;
    }
    const searchPayload = { apellidos: term };  // o el campo que uses en backend para filtrar
    this.search_transportista(searchPayload);
  }

  search_transportista(searchParams: any) {
    this.loadingTransportistas = true;
    console.log("Enviando búsqueda con parámetros:", searchParams);

    this.data.Post("search_transportista", searchParams).subscribe(
      (r) => {
        this.loadingTransportistas = false;
        console.log("Respuesta del servidor:", r);
        if (!r || r.message !== "success") {
          console.error("Error en respuesta del backend:", r);
          this.transportista = [];
        } else {
          const items = r.data.map((item) => ({
            ...item,
            apellidoscompleto: item.apellidos || 'Sin nombre',
          }));
          console.log("Transportistas formateados:", items);
          this.transportista = items;
        }
      },
      (e) => {
        this.loadingTransportistas = false;
        this.transportista = [];
        console.error("Error HTTP al buscar transportistas:", e);
      }
    );
  }

  onSubmit(): void {
    /*     if (this.caja_efectivo.valid) {
      const operacion = this.caja_efectivo.value;
      if (this.editMode) {
        this.editOperacion(operacion, operacion.id);
      }else{
  
        this.saveOperacion(operacion);
      }
    } */
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

