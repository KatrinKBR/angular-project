import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { InfoComponent } from './components/info/info.component';
import { LandingComponent } from './components/landing/landing.component';
import { ListadoComponent } from './components/listado/listado.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'info/:id', component: InfoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
