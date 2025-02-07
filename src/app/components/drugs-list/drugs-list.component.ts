import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnInit,
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
import { DrugService } from '../../services/drug.service';

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
export class DrugsListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'serialNo',
    'name',
    'price',
    'manufacturer',
    'expiryDate',
    'dosage',
    'qrCode',
  ];
  dataSource: MatTableDataSource<DRUG>;

  drugs: any[] = [];
  selectedItem: any;
  modalState: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private drugService: DrugService) {
    this.dataSource = new MatTableDataSource(this.drugs);
  }

  ngOnInit(): void {
    this.fetchDrugs();
    this.dataSource = new MatTableDataSource(this.drugs);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openModal(data: any) {
    this.selectedItem = data;
    this.modalState = true;
  }

  closeModal() {
    this.modalState = false;
    this.selectedItem = {};
  }

  async fetchDrugs() {
    const res: any = await this.drugService.getDrugs();
    console.log('--Response : ', res);
    this.drugs = res;
    this.dataSource.data = this.drugs;
  }

  addDrugs() {
    this.router.navigate(['/add-drug']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
