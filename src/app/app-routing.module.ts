import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JourneyDetailComponent } from './components/journey-detail/journey-detail.component';
import { MeatGraphComponent } from './components/meat-graph/meat-graph.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'journey', component: JourneyDetailComponent},
  {path: 'meat', component: MeatGraphComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
