import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Cliente } from "src/app/Models/cliente/cliente";
import { Sucursal } from "src/app/Models/sucursal/sucursal";
import { Transportista } from "src/app/Models/transportista/transportista";
import { DataService } from "src/app/Service/data.service";

@Component({
  selector: "app-add-guia-salida",
  templateUrl: "./add-guia-salida.component.html",
  styleUrls: ["./add-guia-salida.component.css"],
})
export class AddGuiaSalidaComponent implements OnInit {
  loading = false;
  guiaSalidaForm: FormGroup;
  today = new Date();
  currentTime = new Date();
  cliente: Cliente[] = [];
  nombreCliente: string | null = null;
  transporte: Transportista[] = [];
  sucursales: Sucursal[] = [];

  ventaColumns: string[] = [
    "producto",
    "cantidad",
    "precio",
    "total",
    "acciones",
  ];

  pagoColumns: string[] = ["fecha", "referencia", "total", "acciones"];

  search = {
    top: 100,
    clase: undefined,
    subclase: undefined,
    subgrupo: undefined,
    text: "",
    scale: "ASC",
    marca: "",
    opcion: "idprecio",
    codigo: "",
    nombre: "",
  };

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddGuiaSalidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.guiaSalidaForm = this.fb.group({
      id: [null],
      fecha_guia: [moment().format("YYYY-MM-DD"), Validators.required],
      hora: [moment().format("HH:mm"), Validators.required],
      cliente: ["", [Validators.required, Validators.maxLength(50)]],
      transporte: ["", [Validators.maxLength(50)]],
      sucursal: ["", [Validators.required, Validators.maxLength(20)]],
      referencia_guia: ["", [Validators.maxLength(40)]],
      producto: ["", [Validators.required, Validators.maxLength(25)]],
      cantidad: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      precio: [null, [Validators.required, Validators.maxLength(15), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      total_venta: [null, [Validators.required, Validators.maxLength(15), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      fecha_pago: [moment().format("YYYY-MM-DD"), Validators.required],
      referencia_pago: ["", [Validators.maxLength(20)]],
      importe: [null, [Validators.required, Validators.maxLength(15), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit(): void {
    // Actualizar hora cada segundo
    this.getSucursales();
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  getSucursales() {
    this.dataService.GetSimple(this.dataService.api.sucursal).subscribe(
      (res: any[]) => {
        this.sucursales = res;
      },
      (err) => {
        console.error("Error cargando sucursales", err);
      }
    );
  }

  saveEmpleado(empleado: any): void {
    this.dataService.Post("empleado", empleado).subscribe(
      (res) => {
        console.log("Empleado guardado:", res);
        this.dialogRef.close(res);
      },
      (error) => {
        console.error("Error al guardar el empleado:", error);
      }
    );
  }

  onSearch(term: string) {
    // opcional: filtrar si term es muy corto
    if (!term || term.length < 2) {
      this.cliente = [];
      return;
    }
    this.search.nombre = term; // tu objeto search (ajusta el campo si usas otro)
    this.search_cliente();
  }
  search_cliente() {
    this.loading = true;
    console.log("Enviando busqueda : ", this.search);

    this.dataService.Post("cliente", this.search).subscribe(
      (r) => {
      this.loading = false;

      if (r?.message === 'success' && r.data?.length > 0) {
        const cliente = r.data[0];  // Primer resultado
        this.nombreCliente = cliente.nombre; // Almacenas el nombre
        console.log("Nombre cliente:", this.nombreCliente);
      } else {
        console.warn("Cliente no encontrado");
        this.nombreCliente = null;
      }
    },
    (err) => {
      this.loading = false;
      console.error("Error al buscar cliente:", err);
      this.nombreCliente = null;
    });
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
/* <mat-form-field appearance="outline" floatLabel="always" class="w-100">
  <mat-label>Cliente</mat-label>
  <ng-select
    [items]="cliente"
    bindLabel="nombrecompleto"
    [loading]="loading"
    [typeahead]="searchInput$"
    [typeToSearchText]="'Escribe para buscar...'"
    placeholder="Buscar cliente"
    [(ngModel)]="selectedCliente"
    (change)="onClienteSeleccionado($event)">
  </ng-select>
</mat-form-field> 
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

searchInput$ = new Subject<string>();
cliente: any[] = [];
selectedCliente: any = null;
loading = false;

ngOnInit() {
  this.setupSearch();
}

setupSearch() {
  this.searchInput$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.buscarCliente(term))
    )
    .subscribe(
      (res) => {
        this.cliente = res;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.cliente = [];
        this.loading = false;
      }
    );
}

buscarCliente(term: string) {
  this.loading = true;

  const body = { search: term };

  return this.dataService.Post('cliente', body).pipe(
    // Mapea los datos si es necesario
    // Suponiendo que devuelve { message: 'success', data: [...] }
    switchMap((r: any) => {
      const items = r?.data?.map((item: any) => ({
        ...item,
        nombrecompleto: item.nombre  // Ajusta según estructura real
      })) || [];
      return [items];
    })
  );
}

onClienteSeleccionado(cliente: any) {
  console.log("Cliente seleccionado:", cliente);
}
*/
