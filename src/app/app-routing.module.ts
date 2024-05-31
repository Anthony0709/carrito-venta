import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { LoginComponent } from './componentes/login/login.component';
import { MarcaComponent } from './componentes/marca/marca.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'marca', component: MarcaComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
