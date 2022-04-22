require("jasmine");
const request = require("request-promise");

const url = "http://localhost:3000";

describe("O servidor", () => {
  var server;
  var client = {
    id: 0,
    name: "Aninha",
    cpf: "123.123.123-11",
    email: "alas3@cin.ufpe.br",
    phone: "(11)91111-1111",
    password: "aninhA123",
    pay_method: "debit",
    addresses: [
        {
            name: "casa",
            postal_code: "11111-111",
            address: "Rua Paraiso",
            number: 123,
            district: "Bairro Feliz",
            city: "Jaboatao",
            state: "PE",
            complement: "Apt 201"
        },
        {
            name: "cin",
            postal_code: 22222222,
            address: "Rua Paraiso",
            number: 123,
            district: "Bairro Feliz",
            city: "Jaboatão",
            state: "PE",
            complement: "Apt 201"
        }
    ],
    code: "ABC123",
    validPhone: true,
    pic_url: "https://avatars.githubusercontent.com/u/51363891?v=4"
  };
  var newClient = {
    id: -1,
    name: "Leticia",
    cpf: "222.111.111-11",
    phone: "(11)91234-5678",
    email: "analeticia1101@gmail.com",
    password: "Aninha123"
  };
  var order = {
    id: 0,
    clientId: 0,
    restaurantName: "Dalena",
    address: {
        postal_code: 11111111,
        address: "Rua Paraiso",
        district: "Bairro Feliz",
        city: "Jaboatão",
        state: "PE",
        complement: "Apt 201"
    },
    items: [
        {
            qt: 3,
            description: "sorvete",
            price: 13
        }
    ],
    cost: 39.00,
    deliveryTax: 2.00,
    created_at: "2022-04-02"
  }

  beforeAll(() => {server = require('../server')});

  afterAll(() => {server.closeServer()});

  it("retorna uma lista de clientes", () => {
    return request.get(url + '/clients')
      .then(body => expect(body).toContain(JSON.stringify(client)))
      .catch(e => expect(e).toEqual(null));
  });

  it("retorna um cliente pelo id indicado", () => {
    return request.get(url + '/client/0')
      .then(body => expect(body).toBe(JSON.stringify(client)))
      .catch(e => expect(e).toEqual(null));
  });

  it("valida o código para realizar um cadastro", () => {
    var options = {
      method: 'PUT', 
      uri: (url + `/client/valid_phone/${client.id}&${client.code}`), 
      json: true
    };
    return request(options)
      .then(body => expect(body.message).toBe("Code OK" ))
      .catch(e => expect(e).toEqual(null));
    
  });

  it("cadastra um novo cliente", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        newClient.id = body.id;
        expect(body.cpf).toBe(newClient.cpf);
      })
      .catch(e => expect(e).toEqual(null));
  });

  it("deleta um cliente já cadastrado", () => {
    var options = {
      method: 'DELETE', 
      uri: (url + `/client/${newClient.id}`), 
      json: true
    };
    return request(options)
    .then(body => expect(body.message).toBe('Client successfully deleted')).catch(e => expect(e).toEqual(null));
  });

  it("autentica um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client/login'), 
      body: {email: client.email, password: client.password}, 
      json: true
    };
    return request(options)
      .then(body => expect(body.message).toBe('Client authenticated'))
      .catch(e => expect(e).toEqual(null));
  });

  it("checa senha de um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + `/client/check_password/${client.id}`), 
      body: {password: client.password}, 
      json: true
    };
    return request(options)
      .then(body => expect(body.message).toBe('Correct password'))
      .catch(e => expect(e).toEqual(null));
  });

  it("atualiza um cliente já cadastrado", () => {
    var client_uptaded = JSON.parse(JSON.stringify(client));
    client_uptaded.pay_method = 'money';
    var options = {
      method: 'PUT', 
      uri: (url + '/client'), 
      body: client_uptaded, 
      json: true
    };
    request(options)
      .then(body => expect(JSON.stringify(body)).toBe(JSON.stringify(client_uptaded)))
      .catch(e => expect(e).toEqual(null));
    
    var options = {
      method: 'PUT', 
      uri: (url + '/client'), 
      body: client, 
      json: true
    };
    return request(options)
      .then(body => expect(JSON.stringify(body)).toBe(JSON.stringify(client)))
      .catch(e => expect(e).toEqual(null));
  });

  it("envia e-mail para um cliente conseguir mudar sua senha", () => {
    var options = {
      method: 'POST', 
      uri: (url + `/client/forgot_password/${client.email}`), 
      json: true
    };
    return request(options)
      .then(body => expect(JSON.stringify(body)).toBe(JSON.stringify({ message: 'E-mail sent' })))
      .catch(e => expect(e).toEqual(null));
  });

  it("retorna uma lista de pedidos", () => {
    var options = {
      method: 'GET', 
      uri: (url + '/orders/1'), 
      qs: { 
        filters: {
          start: new Date("2000-01-01"),
          end: new Date("2023-01-01")
        }
      },
      json: true
    };
    return request(options)
      .then(body => expect(body.data).toContain(order))
      .catch(e => expect(e).toEqual(null));
  });

  it("retorna uma lista de pedidos de um cliente cadastrado", () => {
    var options = {
      method: 'GET', 
      uri: (url + `/orders/client/${client.id}/1`), 
      qs: { 
        filters: [ new Date("2000-01-01"), new Date("2023-01-01") ]
      },
      json: true
    };
    return request(options)
      .then(body => expect(body.data).toContain(order))
      .catch(e => expect(e).toEqual(null));
  });

  it("retorna o total de pedidos de um cliente cadastrado", () => {
    var options = {
      method: 'GET', 
      uri: (url + `/orders/total_orders/${client.id}`), 
      json: true
    };
    return request(options)
      .then(body => expect(body.total_orders).toBeGreaterThanOrEqual(0))
      .catch(e => expect(e).toEqual(null));
  });

  it("retorna o perfil de consumo de um cliente cadastrado", () => {
    var options = {
      method: 'GET', 
      uri: (url + `/orders/analytics/${client.id}`), 
      qs: { 
        filters: JSON.stringify({
          start: new Date("2000-01-01"),
          end: new Date("2023-01-01")
        })
      },
      json: true
    };
    return request(options)
      .then(body => {
        expect(Object.keys(body)).toContain('most_request');
        expect(Object.keys(body)).toContain('most_expensive');
      })
      .catch(e => expect(e).toEqual(null));
  });


})