import OrderRepository from "../repositories/interfaces/OrderRepository";

export default class GetOrdersByCPF {
  constructor(readonly orderRepository: OrderRepository) {}
  
  async execute(cpf: string): Promise<Output[]> {
    const output = [];
    const orders = await this.orderRepository.getByCPF(cpf);
    if (!orders) return [];
    for (const order of orders) {
      output.push({ total: order.getTotal() });
    }
    return output;
  }
}

type Output = {
  total: number;
};
