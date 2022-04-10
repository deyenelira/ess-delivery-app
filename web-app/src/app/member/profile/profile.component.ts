import { UpdatePasswordComponent } from './../../update-password/update-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit  } from "@angular/core";
import { ClientService } from "src/app/client/client.service";
import {ReactiveFormsModule} from '@angular/forms';
import { Client } from 'src/app/client/client';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})

export class ProfileComponent{
  name:string;
  cpf:string;
  email:string;
  telefone:string;
  enderecos:string[];
  metodos_pag:string;
  password:string;
  id:number;

  acertouCheck: boolean = true;
  profileForm: FormGroup;
  

  constructor(private clientService: ClientService) {
    this.profileForm = new FormGroup({
            name: new FormControl(),
            telefone: new FormControl(),
            metodo_pag: new FormControl(),
            password: new FormControl(),
            endereco: new FormControl(),
          });
  }

  // método melhorzin
  confirmPassword() : void{
    this.clientService
      .passwordCheck(this.profileForm.value.password, this.id)
      .then((result) => {
        if (!result) {
          this.acertouCheck = false;
        }
        if(result){
          this.acertouCheck = true;
          
          var Novo = new Client
          Novo.name = this.name;
          Novo.pay_method = this.metodos_pag;
          Novo.phone = this.telefone;

          if (this.profileForm.value.name != null){Novo.name = this.profileForm.value.name};
          if (this.profileForm.value.telefone != null){Novo.phone = this.profileForm.value.telefone};
          if (this.profileForm.value.metodo_pag != null){Novo.pay_method = this.profileForm.value.metodo_pag};
          
          
          Novo.addresses = this.enderecos;
          Novo.id = this.id;
          Novo.email = this.email;
          Novo.password = this.password;
          Novo.cpf = this.cpf;
          this.clientService.update(Novo);
        }
      })
      .catch(() => (this.acertouCheck = false));
  }

  ngOnInit(): void {
    this.clientService.getClient().then((result) => {
      this.name = result.name;
      this.cpf = result.cpf;
      this.email = result.email
      this.telefone = result.phone;
      this.enderecos = result.addresses;
      this.metodos_pag = result.pay_method;
      this.password = result.password;
      this.id = result.id
    });
  }  
}
