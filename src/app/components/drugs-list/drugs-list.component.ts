import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface DRUG {
  id: number;
  name: string;
  price: number;
  manufacturer: string;
  expiryDate: Date;
  dosage: any;
}

@Component({
  selector: 'app-drugs-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './drugs-list.component.html',
  styleUrl: './drugs-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrugsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'serialNo',
    'name',
    'price',
    'manufacturer',
    'expiryDate',
    'dosage',
  ];
  dataSource: MatTableDataSource<DRUG>;

  drugs: DRUG[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.drugs);
  }

  addDrugs() {
    this.router.navigate(['/add-drug']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
