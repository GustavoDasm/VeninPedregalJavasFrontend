import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Security/auth.guard';
import { LoginComponent } from './Components/Usuario/login/login.component';
import { IndexComponent } from './Components/index/index/index.component';
import { PersonalComponent } from './Components/personal/personal.component';
import { ProveedorComponent } from './Components/proveedor/proveedor.component';
import { CajaEfectivoComponent } from './Components/caja-efectivo/caja-efectivo.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { CargadaEstibadorComponent } from './Components/cargada-estibador/cargada-estibador.component';
import { JabasComponent } from './Components/jabas/jabas.component';

const routes: Routes = [

  { path:'',component:CargadaEstibadorComponent,canActivate: [AuthGuard]  },
  { path:'usuario/login',component:LoginComponent},
  { path:'usuario/index',component:IndexComponent ,canActivate: [AuthGuard]},
  { path:'personal',component:PersonalComponent,canActivate: [AuthGuard]},
  { path:'proveedor',component:ProveedorComponent,canActivate: [AuthGuard]},
  { path:'caja_efectivo',component:CajaEfectivoComponent,canActivate: [AuthGuard]},
  { path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
  { path:'empleado',component:EmpleadosComponent,canActivate: [AuthGuard]},
  { path:'cargada-estibador',component:CargadaEstibadorComponent,canActivate: [AuthGuard]},
  { path:'jabas',component:JabasComponent,canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
