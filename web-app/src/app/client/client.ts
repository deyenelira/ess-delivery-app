export class Client {
  id: number=0;
  name:  string="" ;
  cpf:  string="";
  email:  string="";
  phone:  string="";
  password:  string="";
  pay_method: string="";
  addresses: string[]=[];
  code:  string="";
  validPhone: boolean= false;

   constructor(name?: string, 
    cpf?: string,
    email?: string,
    phone?: string,
    password?: string) {
      this.name = name ?? "";
      this.cpf = cpf ?? "";
      this.phone = phone ?? "";
      this.email = email ?? "";
      this.password = password ?? "";
      this.pay_method = "";
      this.addresses = [];
      this.code = "";
      this.validPhone = false;
    }
  
}