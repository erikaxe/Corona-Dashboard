

/* Module imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Component imports */
import { HomeComponent } from './components/home/home.component';
import { TotalComponent } from './components/total/total.component';
import { GlobalComponent } from './components/global/global.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'total', component: TotalComponent },
  { path: 'global', component: GlobalComponent },
  { path: 'information&contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Export the routes
export const routingComponents = [
  HomeComponent,
  TotalComponent,
  GlobalComponent,
  ContactComponent,
];
