import { Component, effect, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee/employee.service';
import { ShipperService } from '../../services/shippers/shipper.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product/product.service';
import { OrdersService } from '../../services/orders/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add',
  imports: [
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [
    provideNativeDateAdapter(), // Provisión del adaptador nativo
  ],
})
export class AddComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  employeeservice = inject(EmployeeService);
  employeelist: any[] = [];
  employeesignal = this.employeeservice.employee;
  
  shipperservice = inject(ShipperService);
  shipperslist: any[] = [];
  shippersignal = this.shipperservice.shippers;

  productservice = inject(ProductService);
  productslist: any[] = [];
  productsignal = this.productservice.productos;
  
  
  orderservice =inject(OrdersService);
  confirmsignal = this.orderservice.confirm;


  myForm: FormGroup = new FormGroup({});


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    //listado de empleados
    this.employeeservice.getemployee();
    effect(() => {
      const employees = this.employeesignal();
      this.employeelist = employees;
    });
    //listado de shippers
    this.shipperservice.getshippers();
    effect(() => {
      const shippers = this.shippersignal();
      this.shipperslist = shippers;
    });
    //listado de products
    this.productservice.getproducts();
    effect(() => {
      const products = this.productsignal();
      this.productslist= products;
    });
  }

  ngOnInit(): void {
    //creacion de formulario
    this.myForm = new FormGroup({
      Empid: new FormControl('', [Validators.required]),
      Shipperid: new FormControl('', [Validators.required]),
      Shipname: new FormControl('', [Validators.required]),
      Shipaddress: new FormControl('', [Validators.required]),
      Shipcity: new FormControl('', [Validators.required]),
      Shipcountry: new FormControl('', [Validators.required]),
      Orderdate: new FormControl('', [Validators.required]),
      Requireddate: new FormControl('', [Validators.required]),
      Shippeddate: new FormControl('', [Validators.required]),
      Freight: new FormControl('', [Validators.required]),
      Productid: new FormControl('', [Validators.required]),
      Unitprice: new FormControl('', [Validators.required]),
      Qty: new FormControl('', [Validators.required]),
      Discount: new FormControl('', [Validators.required]),
      custid: new FormControl(this.data.id,),
    });
  }


  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formulario enviado:', this.myForm.value);
      this.orderservice.setnueworder(this.myForm.value).subscribe((data) => {
        data;
        console.log(data); // Los datos del API
        if(data[0].STATUS){
          this._snackBar.open('Order create!', 'Close', {
            horizontalPosition: "end",
            verticalPosition:'top',
          });
        }
      });
  
     
    } else {
      console.log('El formulario no es válido.');
    }
  }

}
