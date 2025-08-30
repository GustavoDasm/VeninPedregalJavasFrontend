import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { TasasAFPS } from 'src/app/Models/tasasafps/tasasafps';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-add-tasa-afps',
  templateUrl: './add-tasa-afps.component.html',
  styleUrls: ['./add-tasa-afps.component.css']
})
export class AddTasaAfpsComponent implements OnInit {

  loading = false;
  tasaAFPSForm: FormGroup;
  today = new Date();
  currentTime = new Date();
  public tasas_afps: TasasAFPS[] = [];

  filaEditando: any = null;

  displayedColumns: string[] = [
    "fecha",
    "comision",
    "seguro",
    "pension",
    "topeseguro",
    "tipocomision",
    "acciones",
  ];

  agregarFila() {
  const nuevaFila = {
    idafps: '',        // puedes dejarlo en blanco o generar un ID temporal
    nombre: '',
    fecha: '',
    comision: '',
    seguro: '',
    pension: '',
    topeseguro: '',
    tipocomision: ''
  };

  // Clonar dataSource
  const data = this.dataSource.data;
  data.push(nuevaFila);
  this.dataSource.data = [...data]; // disparar actualización de tabla
}
//hizo gustavo 
eliminarFila() {
  const data = this.dataSource.data;
  if (data.length > 0) {
    data.pop(); // eliminar última fila (puedes modificar para eliminar otra)
    this.dataSource.data = [...data];
  }
}
editarOperacion(element: any) {
  this.filaEditando = element;
}

guardarOperacion(element: any) {
  console.log('Guardando:', element);

  // Obtener la data actual
  const data = this.dataSource.data;

  // Buscar el índice de la fila editada
  const index = data.findIndex(item => item.idafps === element.idafps);
  if (index !== -1) {
    // Actualizar la fila con los cambios
    data[index] = { ...element };

    // Refrescar la tabla (forzar que Angular Material detecte el cambio)
    this.dataSource.data = [...data];
  }

  // Salir del modo edición
  this.filaEditando = null;
}

//hizo yadhira
eliminarFilaTabla(element: any) {
  this.dataSource.data = this.dataSource.data.filter(item => item !== element);
}

  dataSource: MatTableDataSource<any>;
  operaciones: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddTasaAfpsComponent>,
    private titleService: Title,  
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.tasaAFPSForm = this.fb.group({
    id: [null],
    nombre: ['', [Validators.maxLength(15)]],
    });
    this.titleService.setTitle("TasaAFPS | Sistema Venin");
    this.dataSource = new MatTableDataSource(this.operaciones);
  }

  ngOnInit(): void {
    //this.getTasaAFPS();
    // Actualizar hora cada segundo
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  

  getTasaAFPS() {
    this.data.GetSimple(this.data.api.empleado).subscribe((r) => {
      this.tasas_afps = r;
      this.dataSource.data = r; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  saveAFPS(AFPS: any): void {
    this.dataService.Post("afps", AFPS).subscribe(
      (res) => {
        console.log('Afps y tasaAFPS guardados:', res);
        this.dialogRef.close(res);
      },
      (error) => {
        console.error('Error al guardar AFPS o tasaAFPS:', error);
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

