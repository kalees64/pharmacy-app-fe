import { Routes } from '@angular/router';
import { DrugsListComponent } from './components/drugs-list/drugs-list.component';
import { AddDrugComponent } from './components/add-drug/add-drug.component';
import { ScannerComponent } from './components/scanner/scanner.component';

export const routes: Routes = [
  { path: '', component: DrugsListComponent },
  {
    path: 'add-drug',
    component: AddDrugComponent,
  },
  {
    path: 'scan',
    component: ScannerComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
