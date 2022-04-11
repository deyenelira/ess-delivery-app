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
  modal: boolean = false;

  hoverCancel: boolean = false;
  hoverConfirm: boolean = false;

  wrongPsw: boolean = false;
  rightPsw: boolean = false;
  psw: string = '';

  pay_methods = [['Cartão de Crédito', 'credit'], ['Cartão De Débito', 'debit'], ['Dinheiro', 'money']];
  pay_method: string = 'money';

  erro = {
    'name': false,
    'cpf': false,
    'email': false,
    'phone': false,
    'address-name': false,
    'address-code': false,
    'address-address': false,
    'address-number': false,
    'address-district': false,
    'address-city': false,
    'address-state': false
  }

  reg: { [key: string]: RegExp; }  = {
    'name': new RegExp('^[a-zA-Z\\s]+$'),
    'email': new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    'cpf': new RegExp('^[0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9]{2}$'),
    'phone': new RegExp('^\\(?[1-9]{2}\\)? ?(?:[2-8]|9[1-9])[0-9]{3}\\-?[0-9]{4}$'),
    'address-name': new RegExp('^[a-zA-Z\\s]+$'),
    'address-code': new RegExp('^[0-9]{5}-[0-9]{3}$'),
    'address-address': new RegExp('^(RUA|Rua|R.|AVENIDA|Avenida|AV.|TRAVESSA|Travessa|TRAV.|Trav.) ([a-zA-Z_\s]+)'),
    'address-number': new RegExp('[0-9]+'),
    'address-district': new RegExp('^[a-zA-Z\\s]+$'),
    'address-city': new RegExp('^[a-zA-Z\\s]+$'),
    'address-state': new RegExp('AC|AL|AP|AM|BA|CE|DF|GO|ES|MA|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SP|SC|SE|TO')
  }

  constructor(private clientService: ClientService) {
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
        this.pay_method = result.pay_method;
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

  changePayMethod(pay_method: string) {
    this.client.pay_method = pay_method;
  }

  newAddress() {
    this.addAddress = true;
    this.address = {
      name: '',
      postal_code: '',
      address: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: ''
    };
  }

  saveAddress(ad: any) {
    this.addAddress = false;
    this.client.addresses.push(ad);
  }

  consoleName(name: string) {
    const adname = name;
    console.log(adname);
  }

  validate() {
    var ok = true;
    if (ok) {
      if (!this.reg['name'].test(this.client.name)) {
        this.erro['name'] = true;
        ok = false;
      } else this.erro['name'] = false;

      if (!this.reg['cpf'].test(this.client.cpf)) {
        this.erro['cpf'] = true;
        ok = false;
      } else this.erro['cpf'] = false;

      if (!this.reg['email'].test(this.client.email)) {
        this.erro['email'] = true;
        ok = false;
      } else this.erro['email'] = false;

      if (!this.reg['phone'].test(this.client.phone)) {
        this.erro['phone'] = true;
        ok = false;
      } else this.erro['phone'] = false;

      ok = this.validateAddress(false);
      
    }

    if (ok) {
      this.saveFields();
      this.openModal();
    }
  }

  validateAddress(option: boolean) {
    var ok = true;
    if (ok) {
      if (option && this.alreadyHasAddressName(this.address.name)) {
        this.erro['address-name'] = true;
        ok = false;
      } else this.erro['address-name'] = false;

      if (!this.reg['address-code'].test(this.address.postal_code)) {
        this.erro['address-code'] = true;
        ok = false;
      } else this.erro['address-code'] = false;

      if (!this.reg['address-address'].test(this.address.address)) {
        this.erro['address-address'] = true;
        ok = false;
      } else this.erro['address-address'] = false;

      if (!this.reg['address-number'].test(this.address.number)) {
        this.erro['address-number'] = true;
        ok = false;
      } else this.erro['address-number'] = false;

      if (!this.reg['address-district'].test(this.address.district)) {
        this.erro['address-district'] = true;
        ok = false;
      } else this.erro['address-district'] = false;

      if (!this.reg['address-city'].test(this.address.city)) {
        this.erro['address-city'] = true;
        ok = false;
      } else this.erro['address-city'] = false;

      if (!this.reg['address-state'].test(this.address.state)) {
        this.erro['address-state'] = true;
        ok = false;
      } else this.erro['address-state'] = false;
    }

    if (ok && option) this.saveAddress(this.address);

    return ok;
  }

  alreadyHasAddressName(name: string) {
    return this.client.addresses.find(ad => ad.name === name);
  }

  saveFields() {
    for (let ad of this.client.addresses) {
      if (ad.name === this.address.name) ad = this.address;
    }

    this.client.pay_method = this.pay_method;
  }

  save() {
    this.changeEdit();
  }

  checkPassword() {
    console.log('check password');
    this.clientService.checkPassword(this.psw)
      .then(res => {
        console.log('res:' + res);
        if (!res) {
          this.wrongPsw = true;
          setTimeout(() => {
            this.wrongPsw = false;
          }, 2000);
        } else {
          this.clientService.update(this.client)
            .then(res => {
              this.closeModal();
              this.refresh()
            });
        }
      });
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  refresh(): void {
    window.location.reload();
  }
}
