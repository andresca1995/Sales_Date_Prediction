import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SalesService } from '../../services/sales/sales.service';
import { SalesDate } from '../../model/sales-date';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ListComponent } from '../../dialogs/list/list.component';
import { AddComponent } from '../../dialogs/add/add.component';
@Component({
  selector: 'app-home',
  imports: [MatTableModule,MatPaginatorModule,MatSnackBarModule,MatButtonModule,MatCardModule,MatInputModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog)
  salesservice = inject(SalesService);
  snackbar = inject(MatSnackBar);
  displaycolumns: string[] = ["companyname","LastOrderDate","PredictedOrder","Opciones"]
  datasource = new MatTableDataSource<SalesDate>();
  totalitems =0;
  pagesize=10;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  sales = this.salesservice.salesdate;

  constructor(){
    this.salesservice.getsalesdate();
    effect(()=>{
      const saless = this.sales();
      this.datasource.data = saless;
      this.totalitems = saless.length;
      this.datasource.paginator =this.paginator;
    })
  }

  dialoglist(id:number){
    this.dialog.open(ListComponent,{
      width: '800px',
      maxWidth:'1000px',
      height:'550px',
      maxHeight:'1000px',
      data:{id:id}
    })
  }
  dialogadd(id:number){
    this.dialog.open(AddComponent,{
      width: '800px',
      maxWidth:'1000px',
      height:'700px',
      maxHeight:'1000px',
      data:{id:id}
    })
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.datasource.filter = filterValue.trim().toLowerCase();
  
      if (this.datasource.paginator) {
        this.datasource.paginator.firstPage();
      }
    }
}
