/* Module imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Temporary Import for pipes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


/* Component imports */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TotalComponent } from './components/total/total.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { GlobalComponent } from './components/global/global.component';

/* Apex imports */
import { NgApexchartsModule } from 'ng-apexcharts';
import { GlobalBarChartComponent } from './components/global-bar-chart/global-bar-chart.component';
@NgModule({
  // Components
  declarations: [
    AppComponent,
    HeaderComponent,
    TotalComponent,
    HomeComponent,
    ContactComponent,
    GlobalComponent,
    GlobalBarChartComponent,
  ],
  // Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgApexchartsModule,
  ],
  // Services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
