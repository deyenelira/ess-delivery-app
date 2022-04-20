export class Order {
  id: number=0;
  clientId: number=0;
  restaurantName: string="";
  address: any;
  items: any;
  cost: number=0;
  deliveryTax: number=0;
  created_at: number=0;

  constructor() { }
}
