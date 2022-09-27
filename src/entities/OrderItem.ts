export interface OrderItemI {
  itemId: string;
  price: number;
  quantity: number;
}

export class OrderItem {
  readonly itemId: string;
  readonly price: number;
  readonly quantity: number;
  
  constructor({ itemId, price, quantity }: OrderItemI) {
    this.itemId = itemId;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}
