import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


//modules
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables'; 

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { HomeComponent } from './componentes/home/home.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    HomeComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
