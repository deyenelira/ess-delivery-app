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
  passwordMismatch: boolean = false;
  codeIsCorrect: boolean = true;


  constructor(private clientService: ClientService, private router: Router) {
    this.registrationForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z\\s]*$")]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      cpf: new FormControl('',[
        Validators.maxLength(14),
        Validators.minLength(11),
        Validators.pattern('^[0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9]{2}$'),
        Validators.required]
      ),
      password: new FormControl('', [
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.maxLength(15),
        Validators.minLength(11),
        Validators.pattern('^\\(?[1-9]{2}\\)? ?(?:[2-8]|9[1-9])[0-9]{3}\\-?[0-9]{4}$'),
        Validators.required
      ]),
      confirm_password: new FormControl(),
      },
    );

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
    if(this.registrationForm.value.password !== this.registrationForm.value.confirm_password){
      this.passwordMismatch = true;
      return;
    }
    
    
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
      .catch((erro) => alert(erro._body));
  }

  confirmPhoneNumber(): void {
    

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
          this.codeIsCorrect = true;
        }
      })
      .catch((erro) => {
        this.codeIsCorrect = false;
      });

  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


  ngOnInit(): void {}
}
