require("jasmine");
const request = require("request-promise");

const url = "http://localhost:3000";

describe("O servidor", () => {
  var server;
  var client;
  var order;
  var newClient = {
    name: "Leticia",
    cpf: "222.111.111-11",
    phone: "(11)91234-5678",
    email: "analeticia1101@gmail.com",
    password: "Aninha123"
  };
  var newOrder = {
    clientId: 0,
    restaurantName: "San Paolo",
    address: {
        postal_code: 12345-678,
        address: "Rua AloAlo",
        district: "Bairro Triste",
        city: "Recife",
        state: "PE",
        complement: "Apt 302"
    },
    items: [
        {
            qt: 3,
            description: "sorvete",
            price: 13
        }
    ],
    cost: 39.00,
    deliveryTax: 2.00
  }

  beforeAll(() => {server = require('../server')});

  afterAll(() => {server.closeServer()});

  it("retorna um cliente pelo id indicado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        return request.get(url + `/client/${client.id}`)
          .then(body => {
            expect(body).toBe(JSON.stringify(client));

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };

            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("valida o código para realizar um cadastro", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'PUT', 
          uri: (url + `/client/valid_phone/${client.id}&${client.code}`), 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.message).toBe("Code OK");

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };

            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
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
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'DELETE', 
          uri: (url + `/client/${client.id}`), 
          json: true
        };
        return request(options)
          .then(body => expect(body.message).toBe('Client successfully deleted'))
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("deleta um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'DELETE', 
          uri: (url + `/client/${client.id}`), 
          json: true
        };
        return request(options)
          .then(body => expect(body.message).toBe('Client successfully deleted'))
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("autentica um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'POST', 
          uri: (url + '/client/login'), 
          body: {email: client.email, password: client.password}, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.message).toBe('Client authenticated');

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };
            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("checa senha de um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'POST', 
          uri: (url + `/client/check_password/${client.id}`), 
          body: {password: client.password}, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.message).toBe('Correct password');

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };
            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("atualiza um cliente já cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        client.pay_method = 'money';
        options = {
          method: 'PUT', 
          uri: (url + '/client'), 
          body: client, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(JSON.stringify(body)).toBe(JSON.stringify(client));

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };
            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("envia e-mail para um cliente conseguir mudar sua senha", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;

        options = {
          method: 'POST', 
          uri: (url + `/client/forgot_password/${client.email}`), 
          json: true
        };
        return request(options)
          .then(body => {
            expect(JSON.stringify(body)).toBe(JSON.stringify({ message: 'E-mail sent' }));

            options = {
              method: 'DELETE', 
              uri: (url + `/client/${client.id}`), 
              json: true
            };
            return request(options)
              .then(body => expect(body.message).toBe('Client successfully deleted'))
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("retorna uma lista de pedidos de um cliente cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;
        newOrder.clientId = client.id;

        options = {
          method: 'POST', 
          uri: (url + '/order'), 
          body: newOrder, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.clientId).toBe(newOrder.clientId);
            order = body;

            options = {
              method: 'GET', 
              uri: (url + `/orders/client/${client.id}/1`), 
              qs: { 
                filters: [ new Date("2000-01-01"), new Date("2023-01-01") ]
              },
              json: true
            };
            return request(options)
              .then(body => {
                expect(body.data).toContain(order);

                options = {
                  method: 'DELETE', 
                  uri: (url + `/order/${order.id}`), 
                  json: true
                };
                return request(options)
                  .then(body => {
                    expect(body.message).toBe('Order successfully deleted');

                    options = {
                      method: 'DELETE', 
                      uri: (url + `/client/${client.id}`), 
                      json: true
                    };
                    return request(options)
                      .then(body => expect(body.message).toBe('Client successfully deleted'))
                      .catch(e => expect(e).toEqual(null));
                  })
                  .catch(e => expect(e).toEqual(null));
              })
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("retorna o total de pedidos de um cliente cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;
        newOrder.clientId = client.id;

        options = {
          method: 'POST', 
          uri: (url + '/order'), 
          body: newOrder, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.clientId).toBe(newOrder.clientId);
            order = body;

            options = {
              method: 'GET', 
              uri: (url + `/orders/total_orders/${client.id}`), 
              json: true
            };
            return request(options)
              .then(body => {
                expect(body.total_orders).toBe(1);

                options = {
                  method: 'DELETE', 
                  uri: (url + `/order/${order.id}`), 
                  json: true
                };
                return request(options)
                  .then(body => {
                    expect(body.message).toBe('Order successfully deleted');

                    options = {
                      method: 'DELETE', 
                      uri: (url + `/client/${client.id}`), 
                      json: true
                    };
                    return request(options)
                      .then(body => expect(body.message).toBe('Client successfully deleted'))
                      .catch(e => expect(e).toEqual(null));
                  })
                  .catch(e => expect(e).toEqual(null));
              })
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("retorna o perfil de consumo de um cliente cadastrado", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/client'), 
      body: newClient, 
      json: true
    };
    return request(options)
      .then(body => {
        expect(body.cpf).toBe(newClient.cpf);
        client = body;
        newOrder.clientId = client.id;

        options = {
          method: 'POST', 
          uri: (url + '/order'), 
          body: newOrder, 
          json: true
        };
        return request(options)
          .then(body => {
            expect(body.clientId).toBe(newOrder.clientId);
            order = body;

            options = {
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

                options = {
                  method: 'DELETE', 
                  uri: (url + `/order/${order.id}`), 
                  json: true
                };
                return request(options)
                  .then(body => {
                    expect(body.message).toBe('Order successfully deleted');

                    options = {
                      method: 'DELETE', 
                      uri: (url + `/client/${client.id}`), 
                      json: true
                    };
                    return request(options)
                      .then(body => expect(body.message).toBe('Client successfully deleted'))
                      .catch(e => expect(e).toEqual(null));
                  })
                  .catch(e => expect(e).toEqual(null));
              })
              .catch(e => expect(e).toEqual(null));
          })
          .catch(e => expect(e).toEqual(null));
    })
    .catch(e => expect(e).toEqual(null));
  });

})