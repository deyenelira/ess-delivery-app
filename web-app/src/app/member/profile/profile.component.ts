import { Component, OnInit } from "@angular/core";

import { ClientService } from "src/app/client/client.service";
import { Client } from "src/app/client/client";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

  public client: Client = new Client();
  public address: any = '';

  editando: boolean = false;
  addressIndex: number = 0;
  addAddress: boolean = false;

  constructor(private clientService: ClientService) {
    console.log('criou');
  }
  ngOnInit(): void {
    this.clientService.getClient()
    .then(result => {
      if (result) {
        this.client.id = result.id;
        this.client.name = result.name;
        this.client.cpf = result.cpf;
        this.client.email = result.email;
        this.client.phone = result.phone;
        this.client.pay_method = result.pay_method;
        this.client.addresses = result.addresses;
        this.client.password = result.password;
        this.client.code = result.code;
        this.client.validPhone = result.validPhone;

        if (this.client.addresses.length) {
          this.address = this.client.addresses[0];
        }
        
      }
    });
  }

  changeEdit() {
    this.editando = !this.editando;
  }

  changeAddress(i: number) {
    this.address = this.client.addresses[i];
    console.log('ad:' + JSON.stringify(this.address));
  }

  newAddress() {
    this.addAddress = true;
    this.address = {
      name: '',
      postal_code: '',
      address: '',
      district: '',
      state: '',
      complement: ''
    };
  }

  saveAddress(ad: any) {
    console.log(ad);
    this.addAddress = false;
    this.client.addresses.push(ad);
    console.log(this.client.addresses);
  }
}
