import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';
import localeEs from '@angular/common/locales/es';
//taost
import { NotifierModule, NotifierOptions } from 'angular-notifier';
//paginacion
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
//app autocomplete
import { NgSelectModule } from '@ng-select/ng-select';

// Forms module
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './Security/auth.guard';
import { LoginComponent } from './Components/Usuario/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/Default/header/header.component';
import { NavbarComponent } from './Components/Default/navbar/navbar.component';
import { SidebarComponent } from './Components/Default/sidebar/sidebar.component';
import { FooterComponent } from './Components/Default/footer/footer.component';
import { LoadingComponent } from './Components/objects/loading/loading.component';
import { NothingComponent } from './Components/objects/nothing/nothing.component';
import { AlertComponent } from './Components/objects/alert/alert/alert.component';
import { DeleteModalComponent } from './Components/objects/delete/delete-modal/delete-modal.component';
import { ModalComponent } from './Components/objects/modal/modal/modal.component';
import { InfoComponent } from './Components/objects/info/info/info.component';
import { MessageComponent } from './Components/objects/message/message/message.component';
import { SpanComponent } from './Components/objects/span/span/span.component';
import { WaitingComponent } from './Components/objects/waiting/waiting/waiting.component';
import { IndexComponent } from './Components/index/index/index.component';
import { CatalogoProductoComponent } from './Components/catalogoproducto/catalogo-producto/catalogo-producto.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { EditEmpresaComponent } from './Components/edit-empresa/edit-empresa.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule, MatExpansionModule, MatMenuModule, MatProgressSpinnerModule, MatSortModule, MatTabsModule } from '@angular/material';
import { PersonalComponent } from './Components/personal/personal.component';
import { getSpanishPaginatorIntl } from './shared/mat-paginator-intl-es';
import { AddPersonalComponent } from './Components/personal/add-personal/add-personal.component';
import { ProveedorComponent } from './Components/proveedor/proveedor.component';
import { AddProveedorComponent } from './Components/proveedor/add-proveedor/add-proveedor.component';
import { LimitarDecimalesDirective } from './Directives/limitar-decimales/limitar-decimales.directive';
import { CajaEfectivoComponent } from './Components/caja-efectivo/caja-efectivo.component';
import { SelectSucursalComponent } from './Components/select-sucursal/select-sucursal.component';
import { StringToNumberPipe } from './string-to-number.pipe';
import { AddCajaEfectivoComponent } from './Components/caja-efectivo/add-caja-efectivo/add-caja-efectivo.component';
import { SelectOperacionComponent } from './Components/caja-efectivo/select-operacion/select-operacion.component';
import { ReporteGeneralCajaComponent } from './Components/reporte-general-caja/reporte-general-caja.component';
import { ReportePorTipoComponent } from './Components/reporte-por-tipo/reporte-por-tipo.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { AddEmpleadoComponent } from './Components/empleados/add-empleado/add-empleado.component';
import { CargadaEstibadorComponent } from './Components/cargada-estibador/cargada-estibador.component';
import { JabasComponent } from './Components/jabas/jabas.component';



const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    NothingComponent,
    AlertComponent,
    DeleteModalComponent,
    ModalComponent,
    InfoComponent,
    MessageComponent,
    SpanComponent,
    WaitingComponent,
    IndexComponent,
    StringToNumberPipe,
    CatalogoProductoComponent,
    SelectSucursalComponent,
    ConfiguracionComponent,
    EditEmpresaComponent,
    DashboardComponent,
    PersonalComponent,
    AddPersonalComponent,
    ProveedorComponent,
    AddProveedorComponent,
    LimitarDecimalesDirective,
    CajaEfectivoComponent,
    AddCajaEfectivoComponent,
    SelectOperacionComponent,
    ReporteGeneralCajaComponent,
    ReportePorTipoComponent,
    EmpleadosComponent,
    AddEmpleadoComponent,
    CargadaEstibadorComponent,
    JabasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    QRCodeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule

  ],
  providers: [AuthGuard, DatePipe, { provide: LOCALE_ID, useValue: 'en-US' },{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  entryComponents: [
    AddPersonalComponent,
    AddProveedorComponent,
    SelectOperacionComponent,
    AddCajaEfectivoComponent,
    ReporteGeneralCajaComponent,
    AddEmpleadoComponent,
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
