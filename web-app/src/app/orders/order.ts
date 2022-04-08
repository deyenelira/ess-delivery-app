export class Order {
  id: number;
  clientId: number;
  restaurantId: number;
  address: string;
  items: string[];
  cost: number;
  deliveryTax: number;
  created_at: number;

  constructor() { }
}