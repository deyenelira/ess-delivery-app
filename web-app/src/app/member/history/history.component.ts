import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core"

import { Order } from "src/app/orders/order";
import { orderService } from "src/app/orders/order.service";
import { ClientService } from "src/app/client/client.service";
import { Client } from "src/app/client/client";
@Component({
  selector: "history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  constructor(public orderService:orderService,
              public clientService:ClientService) {}
  
  getHistory: boolean = true;
  getOrder: boolean = false;
  getFilter: boolean = false;
  client: Client = new Client();
  page: number = 1;
  order: Order = new Order();
  orders: Order[] = [];
  firstDate: string = "";
  lastDate: string = "";
  period: string = "Essa semana";

  monthNames: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
                        'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                        'Outubro', 'Novembro', 'Dezembro'];

  public clickOrder(orderId: number) {
    this.page = 1;
    this.getOrder = !this.getOrder;
    this.getHistory = !this.getHistory;
    this.showOrder(orderId);
  }

  public showOrder(orderId: number) {
    this.orderService.getOrder(orderId).then(orders => this.order = orders);
  }

  validButton(): void {
    this.getFilter = !this.getFilter;
    console.log(this.getFilter);
  }

  ngOnInit(): void {
    this.weekFilter();
  }

  getOrders(): void { 
    this.clientService.getClient().then((result) => {
      this.client = result;
      this.orderService.getOrders(this.page, this.client.id, [this.firstDate, this.lastDate]).then(orders => this.orders = orders);
    }); 
  }

  public monthFilter(): void {
    this.validButton();
    var date = new Date();
    this.firstDate = `${date.getFullYear()}/${(date.getMonth() + 1)}/01`
    this.lastDate = `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`
    console.log(this.firstDate, this.lastDate)
    this.getOrders();
  }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    d = new Date(d.setDate(diff));
    d.setHours(0), d.setMinutes(0), d.setSeconds(0), d.setMilliseconds(0);
    return d;
  }

  public weekFilter(): void {
    this.period = "Essa semana";
    var date = new Date();
    var monday = this.getMonday(date);
    this.firstDate = `${monday.getFullYear()}/${(monday.getMonth() + 1)}/${monday.getDate()}`
    this.lastDate = `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`
    console.log(this.firstDate, this.lastDate)
    this.getOrders();
  }

  nextPage(): void {
    if (!this.getOrder){
      this.page = this.page + 1;
      this.orderService.getOrders(this.page, this.client.id, [this.firstDate, this.lastDate])
        .then(orders => {
          if (orders.length) {
            this.orders = orders;
          } else {
            this.page = this.page - 1;
          }
        });
    }
  }

  previousPage(): void {
    if(this.page != 1 && !this.getOrder){
      this.page = this.page - 1
      this.orderService.getOrders(this.page, this.client.id, [this.firstDate, this.lastDate]).then(orders => this.orders = orders);
    }
  }

  openDatePicker(dp: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?: any) {
    var s = new Date(eventData);
    var e = new Date(eventData);
    e.setMonth(e.getMonth() + 1);
    this.firstDate = s.toDateString();
    this.lastDate = e.toDateString();
    dp.close();   

    this.period = this.monthNames[s.getMonth()] + '/' + s.getFullYear();
    console.log(this.firstDate, this.lastDate);
    this.getOrders();
  }
}