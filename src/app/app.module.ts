import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule }  from './material.module'
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts'
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import { RegionComponent } from './home/region/region.component';
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    FusionChartsModule,
  
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
