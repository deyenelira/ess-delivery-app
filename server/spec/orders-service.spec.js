const { OrderService } = require('../src/orders/orders-service');
const { Order } = require('../src/orders/order');

describe("O serviço de pedidos", () => {
  var orderService;
  var clientId = 11;
  var order;
  var newOrder = {
    clientId: clientId,
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
  };

  beforeEach(() => orderService = new OrderService());
  afterAll(() => {console.log('\n')});

  function addOrder(){
    order = orderService.add(newOrder);
  }

  function deleteOrder() {
    orderService.delete(order.id);
  }

  it("tem inicialmente não tem pedido cadastrado do cliente de id 11", () => {
    var filters =  [ new Date("2000-01-01"), new Date("2023-01-01") ];
    expect(orderService.getByClientId(clientId, 1, filters).data.length).toBe(0);
  });

  it("retorna o total de pedidos de um cliente", () => {
    addOrder();

    var total = orderService.getTotalOrders(clientId);
    expect(total).toBe(1);

    deleteOrder();
  });

  it("cadastra pedidos", () => {
    addOrder();

    expect(order.clientId).toBe(clientId);
    expect(order.restaurantName).toBe('San Paolo');
    expect(order.cost).toBe(39.00);
    expect(order.deliveryTax).toBe(2.00);

    deleteOrder();
  });

  it("deleta um pedido cadastrado", () => {
    addOrder();
    
    var status = orderService.delete(order.id);
    expect(status).toBe(true);

  });

  it("retorna o perfil de consumo de um cliente cadastrado", () => {
    addOrder();

    var filters = { start: new Date("2000-01-01"), end: new Date("2023-01-01") };
    var data = orderService.getAnalytics(clientId, filters);
    expect(Object.keys(data)).toContain('most_request');
    expect(Object.keys(data)).toContain('most_expensive');

    deleteOrder();
  });

})