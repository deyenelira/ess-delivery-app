import { Component, OnInit  } from "@angular/core";
import { ClientService } from "src/app/client/client.service";
import {ReactiveFormsModule} from '@angular/forms';
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
  telefone:string;
  enderecos:string[];
  metodos_pag:string;
  password:string;

  acertouCheck: boolean = true;
  profileForm: FormGroup;
  

  constructor(private clientService: ClientService) {
    this.profileForm = new FormGroup({
            name: new FormControl(),
            telefone: new FormControl(),
            metodo_pag: new FormControl(),
            password: new FormControl(),
          });
  }

  confirmPassword(): void{
        this.clientService.getClient().then((result) => {
          if(this.profileForm.value.password != result.password){
            this.acertouCheck=false;
          }
          if(this.profileForm.value.password == result.password){
            this.acertouCheck=true;
          }
        });
      }

  ngOnInit(): void {
    this.clientService.getClient().then((result) => {
      this.name = result.name;
      this.cpf = result.cpf;
      this.telefone = result.phone;
      this.enderecos = result.addresses;
      this.metodos_pag = result.pay_method;
      this.password = result.password;
    });
  }
  
}
