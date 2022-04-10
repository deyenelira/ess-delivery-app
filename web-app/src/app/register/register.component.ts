import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Client } from "src/app/client/client";
import { ClientService } from "src/app/client/client.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup;
  confirmNumberForm:FormGroup;
  enviouFormsRegister: boolean = false;
  showFormsConfirm: boolean = false;
  registeredClient: number = -1;

  constructor(private clientService: ClientService, private router: Router) {
    this.registrationForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      cpf: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      confirm_password: new FormControl(),
    });

    this.confirmNumberForm = new FormGroup({
      code: new FormControl(),
      
    });
  }

  client: Client = new Client();
  clients: Client[] = [];


  createClient(): void {
    

    var newClient = {
      name: this.registrationForm.value.name,
      cpf: this.registrationForm.value.cpf,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
      password: this.registrationForm.value.password
    };
    
    this.clientService
      .create(newClient)
      .then((result) => {
        if (result) {
          const resultado = <Client>result;
          this.registeredClient = resultado.id;
          this.clients.push(<Client>result);
          this.client = new Client();
          this.enviouFormsRegister = true;
          this.showFormsConfirm = true;
        }
      })
      .catch((erro) => alert(erro));
  }

  confirmPhoneNumber(): void {
    // var phoneCode = {
    //   id: this.registeredClient,
    //   code:this.confirmNumberForm.value.code
    // };

    this.clientService
      .confirmNumber(this.registeredClient, this.confirmNumberForm.value.code, this.registrationForm.value.email, this.registrationForm.value.password )
      .then((result) => {
        if (result) {
          const resultado = <Client>result;
          this.registeredClient = resultado.id;
          this.clients.push(<Client>result);
          this.client = new Client();
          this.enviouFormsRegister = true;
          this.showFormsConfirm = true;
        }
      })
      .catch((erro) => alert(erro));

  }


  ngOnInit(): void {}
}
