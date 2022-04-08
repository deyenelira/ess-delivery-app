import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Order } from './order';

@Injectable()
export class orderService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  url = 'http://localhost:3000';
  Orders = [];
  date = "2022/04/02";

  constructor(private http: Http) {}

  getQtd(clientId: number): Promise<number> {
    console.log(clientId, 'getqtd')
    return this.http.get(this.url + `/orders/total_orders/${clientId}`)
      .toPromise()
      .then((res => res.json() as number))
      .catch(this.catch);
  }

  getOrders(page: number, clientId: number, dates: string[]): Promise<Order[]> {
    return this.http.get(this.url + `/orders/client/${clientId}/${page}`, { params: { filters: dates }})
      .toPromise()
      .then((res => res.json() as Order[]))
      .catch(this.catch);
  }

  getOrder(orderId: number): Promise<Order> {
    return this.http.get(this.url + `/order/${orderId}`, { params: { filters: this.date }})
      .toPromise()
      .then((res => res.json() as Order))
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any> {
    console.error('Oops, something went wrong', erro);
    return Promise.reject(erro.message || erro);
  }
}