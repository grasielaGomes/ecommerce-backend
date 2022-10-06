import { Order } from "../entities";
import OrderRepository from "../repositories/interfaces/OrderRepository";

export default class GetOrderByNumber {
  constructor(readonly orderRepository: OrderRepository) {}
  
  async execute(orderNumber: string): Promise<Order | null> {
    const order = await this.orderRepository.getByNumber(orderNumber)
    if (!order) return null;
    return order;
  }
}

