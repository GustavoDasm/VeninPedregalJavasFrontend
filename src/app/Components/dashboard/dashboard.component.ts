import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartVentasDiarias: any;  // Variable para el primer gráfico
  chartVentasMetodoPago: any;
  charTopVentasMes: any;
  chartStockProductos: any;
  tableDisplayedColumns: string[] = []; // columnas dinámicas, p.e. ['tipo_4','tipo_6','otros','total']
  tableColumnLabels: { [key: string]: string } = {}; // p.e. { 'tipo_4': 'Compras', 'total': 'Total' }
  tableDataSource = new MatTableDataSource<any>([]);
  tiposIngresos: any[] = [];
  tiposSalidas: any[] = [];
  showChart = true; // Controla la visibilidad del gráfico
  public today = new Date();
  public selectedMonth: string = ''; // Mes seleccionado
  public meses = [
    { nombre: 'Enero', valor: '01' },
    { nombre: 'Febrero', valor: '02' },
    { nombre: 'Marzo', valor: '03' },
    { nombre: 'Abril', valor: '04' },
    { nombre: 'Mayo', valor: '05' },
    { nombre: 'Junio', valor: '06' },
    { nombre: 'Julio', valor: '07' },
    { nombre: 'Agosto', valor: '08' },
    { nombre: 'Septiembre', valor: '09' },
    { nombre: 'Octubre', valor: '10' },
    { nombre: 'Noviembre', valor: '11' },
    { nombre: 'Diciembre', valor: '12' }
  ];

  public DataSetByType = [];
  constructor(private data: DataService) { }
  ngOnInit(): void {
    this.selectedMonth = (this.today.getMonth() + 1).toString()
    this.GetData();

  }

  GetData() {
    // this.GetGastos() 
    this.getMovimientos()
  }

  GetGastos() {
    this.DataSetByType = []
    this.showChart = true;
    const currentYear = new Date().getFullYear();  // año actual
    const baseDate = moment(`${currentYear}-${this.selectedMonth}`, 'YYYY-MM');

    const startOfMonth = baseDate.startOf('month').format('YYYY-MM-DD');
    const endOfMonth = baseDate.endOf('month').format('YYYY-MM-DD');
    const filtro: any = {
      mes: this.selectedMonth,
      top: 99999,
      scale: 'ASC',
      fec_ini: startOfMonth,
      fec_fin: endOfMonth,
      estado: 'emitido',
      tipocaja: 'S',
      idsucursal: this.data.getSucursalId()
    }
    this.data.Post('search_caja_efec', filtro).subscribe(
      (data) => {
        console.log("data obtenida", data);
        this.GraficoGastosPieByTipoMonth(data.data, this.tiposSalidas, this.selectedMonth);
        this.buildSimpleGastosTable(data.data, this.tiposSalidas, this.selectedMonth, 2025);
      },
      (error) => {
        console.error(error)
        this.showChart = false;
        this.buildSimpleGastosTable([], this.tiposSalidas, this.selectedMonth, currentYear);
      }
    )
  }

  getMovimientos() {
    this.data.GetSimple("tipomovimiento").subscribe(
      (res) => {
        console.log(res);
        this.tiposIngresos = res.filter(mov => mov.categoria == 'I');
        console.log("Tipos de ingresos:", this.tiposIngresos);
        this.tiposSalidas = res.filter(mov => mov.categoria == 'S');
        console.log("Tipos de salidas:", this.tiposSalidas);
      },
      (error) => {
        console.error('Error al obtener tipos de movimientos:', error);
      }
    )
  }


  GraficoGastosPieByTipoMonth(
    transactions: any[],
    tiposSalidas: { id: number, descripcion: string }[],
    selectedMonthName: string,
    year: number = (new Date()).getFullYear()
  ): void {

    if (this.chartVentasDiarias) {
      this.chartVentasDiarias.destroy();
    }

    // obtener el valor del mes ('01'..'12') desde this.meses
    const mesObj = (this.meses || []).find(m => m.valor === selectedMonthName);
    const selectedValor = mesObj ? mesObj.valor : ('0' + (new Date().getMonth() + 1)).slice(-2);

    // mapa tipoId -> índice
    const tipoIndexMap: { [key: number]: number } = {};
    tiposSalidas.forEach((t, i) => tipoIndexMap[t.id] = i);

    // acumular importes por tipo (sin "Otros")
    const sumsByTipo: number[] = tiposSalidas.map(() => 0);

    transactions.forEach(tx => {
      if (!tx.fecha) return;
      const [yStr, mStr] = String(tx.fecha).split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      if (y !== Number(year) || isNaN(m)) return;
      if (('0' + m).slice(-2) !== selectedValor) return;

      const importe = +(tx.importe) || 0;
      const tipoId = Number(tx.tipo_operacion);

      if (tipoIndexMap.hasOwnProperty(tipoId)) {
        sumsByTipo[tipoIndexMap[tipoId]] += importe;
      } else {
        // Si el campo es obligatorio, esto debería no pasar; lo dejamos en warn por si hay datos corruptos.
        console.warn(`Registro con tipo_operacion desconocido (id=${tipoId}), se ignora.`, tx);
      }
    });

    // preparar labels/values (omitimos tipos con 0)
    const labels: string[] = [];
    const values: number[] = [];

    tiposSalidas.forEach((tipo, i) => {
      const v = Math.round(sumsByTipo[i] * 100) / 100;
      if (v > 0) {
        labels.push(tipo.descripcion);
        values.push(v);
      }
    });

    const totalAll = values.reduce((a, b) => a + b, 0);
    if (totalAll === 0) {
      console.warn('No hay gastos para el mes seleccionado.');
      return;
    }

    // colores simples por slice
    const colors = labels.map((_, i) => {
      const hue = Math.round((i * (360 / labels.length)) % 360);
      return `hsla(${hue}, 70%, 45%, 0.85)`;
    });
    const borderColors = colors.map(c => c.replace(/0\.85\)/, '1)'));

    const titleText = `Gastos de ${mesObj.nombre} - ${year}`;

    this.chartVentasDiarias = new Chart('ventasChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true, position: 'bottom' },
        title: { display: true, text: titleText, fontSize: 16 },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const value = Number(dataset.data[tooltipItem.index]) || 0;
              const pct = (value / totalAll) * 100;
              return `${data.labels[tooltipItem.index]}: S/ ${value.toFixed(2)} (${pct.toFixed(2)}%)`;
            }
          }
        }
      }
    });
  }

  // función que construye la tabla simple
  buildSimpleGastosTable(
    transactions: any[],
    tiposSalidas: { id: number, descripcion?: string }[],
    selectedMonthName: string,
    year: number = (new Date()).getFullYear()
  ): void {

    // obtener el valor del mes ('01'..'12') desde this.meses
    const mesObj = (this.meses || []).find(m => m.valor === selectedMonthName);
    const selectedValor = mesObj ? mesObj.valor : ('0' + (new Date().getMonth() + 1)).slice(-2);

    // inicializar sumas por tipo
    const sumsMap: { [id: number]: number } = {};
    tiposSalidas.forEach(t => sumsMap[t.id] = 0);
    let otrosTotal = 0;

    // acumular
    transactions.forEach(tx => {
      if (!tx.fecha) return;
      const [yStr, mStr] = String(tx.fecha).split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      if (y !== Number(year) || isNaN(m)) return;
      if (('0' + m).slice(-2) !== selectedValor) return;

      const importe = +(tx.importe) || 0;
      const tipoId = Number(tx.tipo_operacion);

      if (sumsMap.hasOwnProperty(tipoId)) {
        sumsMap[tipoId] += importe;
      } else {
        // si aparece un tipo no listado, se notifica
        console.warn(`Tipo de operación no reconocido: ${tipoId}, se omitirá`);
      }
    });

    // construir columnas dinámicas y fila única
    const colIds: string[] = [];
    const labels: { [k: string]: string } = {};

    tiposSalidas.forEach(t => {
      const colId = `tipo_${t.id}`;
      colIds.push(colId);
      labels[colId] = t.descripcion || `Tipo ${t.id}`;
    });

    if (otrosTotal > 0) {
      colIds.push('otros');
      labels['otros'] = 'Otros';
    }

    // columna total
    colIds.push('total');
    labels['total'] = 'Total';

    // crear fila con los montos
    const row: any = {};
    let totalAll = 0;
    tiposSalidas.forEach(t => {
      const colId = `tipo_${t.id}`;
      const v = Math.round((sumsMap[t.id] || 0) * 100) / 100;
      row[colId] = v;
      totalAll += v;
    });

    if (otrosTotal > 0) {
      const v = Math.round(otrosTotal * 100) / 100;
      row['otros'] = v;
      totalAll += v;
    }

    row['total'] = Math.round(totalAll * 100) / 100;

    // guardar en propiedades para el template
    this.tableDisplayedColumns = colIds;
    this.tableColumnLabels = labels;
    this.tableDataSource.data = [row];
  }

}
