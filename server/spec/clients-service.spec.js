const { ClientService } = require('../src/clients/clients-service');
const { Client } = require('../src/clients/client');

describe("O serviço de clientes", () => {
  var originalTimeout;
  var clientService;
  var client;
  var newClient = {
    name: "Leticia",
    cpf: "222.111.111-11",
    phone: "(11)91234-5678",
    email: "analeticia1101@gmail.com",
    password: "Aninha123"
  };

  beforeAll(() => {
    process.stdout.write("clients-service: ");
  });
  beforeEach(() => {
    clientService = new ClientService();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  afterAll(() => {
    console.log('\n');
  });


  function addClient(){
    client = clientService.add(newClient);
  }

  function deleteClient() {
    clientService.delete(client.id);
  }

  it("tem inicialmente 2 clientes cadastrados", () => {
    expect(clientService.get().length).toBe(2);
  });

  it("retorna dados de um cliente cadastrado pelo id", () => {
    addClient();

    var dataClient = clientService.getById(client.id);
    expect(dataClient).toBe(client);

    deleteClient();
  });

  it("retorna dados de um cliente cadastrado pelo email", () => {
    addClient();

    var dataClient = clientService.getByEmail(client.email);
    expect(dataClient).toBe(client);

    deleteClient();
  });

  it("cadastra clientes", () => {
    addClient();

    expect(client.name).toBe('Leticia');
    expect(client.cpf).toBe('222.111.111-11');
    expect(client.phone).toBe('(11)91234-5678');
    expect(client.email).toBe('analeticia1101@gmail.com');

    deleteClient();
  });

  it("atualiza dados de cliente já cadastrado", () => {
    addClient();
    
    client.pay_method = 'money';
    var updatedClient = clientService.update(client);
    expect(updatedClient).toBe(client);

    deleteClient();
  });

  it("valida o código para realizar um cadastro", () => {
    addClient();
    
    var validatedClient = clientService.updateValidNumberStatus(client.id, client.code);
    expect(validatedClient.validPhone).toBe(true);

    deleteClient();
  });

  it("deleta um cliente cadastrado", () => {
    addClient();
    
    clientService.delete(client.id);
    expect(clientService.getById(client.id)).toBe(undefined);

  });

  it("autentica um cliente cadastrado", () => {
    addClient();
    
    var status = clientService.authenticate(client.email, client.password);
    expect(status).toBe(true);

    deleteClient();
  });

  it("checa a senha de um cliente cadastrado", () => {
    addClient();
    
    var status = clientService.checkPassword(client.id, client.password);
    expect(status).toBe(true);

    deleteClient();
  });

  it("envia e-mail para um cliente conseguir mudar sua senha", async () => {
    addClient();

    return clientService.forgotPassword(client.email)
            .then(status => {
              expect(status).toBe(true);
              deleteClient();
            });
  });

})