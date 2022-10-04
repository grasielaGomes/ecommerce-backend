import { Order } from "../entities";
import ItemRepository from "../repositories/interfaces/ItemRepository";
import OrderRepository from "../repositories/interfaces/orderRepository";

export default class Checkout {
  constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<void> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    this.orderRepository.save(order);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: string; quantity: number }[];
};