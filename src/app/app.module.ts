import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/AuthInterceptors';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './pages/autenticacion/auth/auth.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './pages/Principal/dashboard/dashboard.component';

import { HeaderComponent } from './components/header/header.component';
import { MConfirmacionComponent } from './components/modales/m-confirmacion/m-confirmacion.component';
import { ViewComponent } from './pages/Principal/view/view.component';
import { PrincipalComponent } from './components/principal/principal.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoaderComponent,
    DashboardComponent,
    HeaderComponent,
    MConfirmacionComponent,
    ViewComponent,
    PrincipalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
