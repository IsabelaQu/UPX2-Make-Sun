import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Importa RouterModule

import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([  // Configura as rotas no módulo principal
      { path: '', component: RegisterComponent },  // Adicione suas rotas aqui
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
