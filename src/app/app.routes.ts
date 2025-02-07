import { Routes } from '@angular/router';
import { DrugsListComponent } from './components/drugs-list/drugs-list.component';
import { AddDrugComponent } from './components/add-drug/add-drug.component';

export const routes: Routes = [
  { path: '', component: DrugsListComponent },
  {
    path: 'add-drug',
    component: AddDrugComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
