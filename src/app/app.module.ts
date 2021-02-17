/* Module imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


/* Component imports */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TotalComponent } from './components/total/total.component';
import { HomeComponent } from './components/home/home.component';
import { DailyComponent } from './components/daily/daily.component';
import { ContactComponent } from './components/contact/contact.component';

/* Service imports */

@NgModule({
  // Components
  declarations: [
    AppComponent,
    HeaderComponent,
    TotalComponent,
    HomeComponent,
    DailyComponent,
    ContactComponent
  ],
  // Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  // Services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
