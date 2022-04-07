import { Component, OnInit  } from "@angular/core";
import { ClientService } from "src/app/client/client.service";
import { Client } from "src/app/client/client";

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

// export class PasswordComponent implements OnInit {
//   errouCheck: boolean = false;
//   passwordForm: FormGroup

//   constructor(private clientService: ClientService){
// 
//   }

//   confirmPassword(): void{
//     this.clientService
//       .passwordCheck(this.passwordForm.value.password)
//       .then((result)=> {
//         if(!result){
//           this.errouCheck = true;
//         }
//       })
//       .catch(()=> (this.errouCheck = true))
//   }

//   ngOnInit(): void {}
// }


export class ProfileComponent implements OnInit{
  name:string;
  cpf:string;
  telefone:string;
  enderecos:string[];
  metodos_pag:string;
  password:string;

  errouCheck: boolean = false;
  passwordForm: FormGroup;
  

  constructor(private clientService: ClientService) {
    this.passwordForm = new FormGroup({
            name: new FormControl(),
            telefone: new FormControl(),
            metodo_pag: new FormControl(),
            password: new FormControl()
          });
  }

  confirmPassword(): void{
        this.clientService
          .passwordCheck(this.passwordForm.value.password)
          .then((result)=> {
            if(!result){
              this.errouCheck = true;
            }
          })
          .catch(()=> (this.errouCheck = true))
      }

  ngOnInit(): void {
    this.clientService.getClient().then((result) => {
      this.name = result.name;
      this.cpf = result.cpf
      this.telefone = result.phone
      this.enderecos = result.addresses
      this.metodos_pag = result.pay_method
      this.password = result.password
    });
  }
  
}
