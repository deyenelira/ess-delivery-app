import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Client } from "src/app/client/client";
import { ClientService } from "src/app/client/client.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from "src/app/orders/order";
import { orderService } from "src/app/orders/order.service";
import { number } from "echarts";

@Component({
  selector: "add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"],
})
export class AddOrderComponent{

  constructor(private clientService: ClientService, private orderService : orderService, private router: Router) {
    
  }

  order: Order = new Order();
  orders: Order[] = [];
  item: any = {
    qt: 0,
    description: "",
    price: 0
  };
  clear: any = {
    qt: 0,
    description: "",
    price: 0
  };
  items: any[] =[];
  
  createOrder(o: Order): void {
    
    o.clientId = this.clientService.getId();
    o.items = this.items;

    this.orderService
      .create(o)
      .then((result) => {
        if (result) {
          this.orders.push(<Order>result);
          this.order = new Order();
        }
      })
      .catch(erro=> alert(erro));
      
    this.items = [];
  }

  createItem(i: any): void {
    this.items.push(i)
    this.item = this.clear
  }

  deleteAllOrders(): void {
    this.orderService.deleteAll(this.clientService.getId(),this.order,'Deletando os testes');
  }

}
