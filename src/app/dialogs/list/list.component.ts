import {  Component, effect, Inject, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../model/orders';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatTableModule,MatPaginatorModule,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  ordersservice= inject(OrdersService);
  snackbar = inject(MatSnackBar);
  
  //Variables para crear la tabla 
  displaycolumns: string[] = ["Orderid","Requireddate","Shippeddate","Shipname","Shipaddress","Shipcity"]

  datasource = new MatTableDataSource<Orders>();
  totalitems =0;
  pagesize=10;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  sales = this.ordersservice.orders;


  constructor(
  @Inject(MAT_DIALOG_DATA) public data: { id: number }

  ){

    this.ordersservice.getortders(data.id);
    effect(()=>{
      const orders = this.sales();
      this.datasource.data = orders;
      this.totalitems = orders.length;
      this.datasource.paginator =this.paginator;
    })
  }
}
