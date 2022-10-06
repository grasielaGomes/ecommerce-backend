import { Order } from "../../entities";
import OrderRepository from "../interfaces/OrderRepository";
import { CadastroPessoaFisica } from "../../entities/Cpf";

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];
  counter: number;
  constructor() {
    this.orders = [];
    this.counter = 0;
  }
  async getByNumber(orderNumber: string): Promise<Order | null> {
    const order = this.orders.find(
      (order) => order.orderNumber === orderNumber
    );
    if (!order) return null;
    return order;
  }
  async getByCPF(cpf: string): Promise<Order[] | null> {
    const orders = this.orders.filter(
      (order) => order.document.cpf === new CadastroPessoaFisica(cpf).cpf
    );
    if (!orders.length) return null;
    return orders;
  }
  async save(order: Order): Promise<void> {
    const orderWithNumber = this.addOrderNumber(order);
    await this.orders.push(orderWithNumber);
  }
  
  private addOrderNumber(order: Order): Order {
    const orderWithNumber = order;
    this.counter++;
    orderWithNumber.orderNumber = `${new Date().getFullYear()}${String(
      this.counter
    ).padStart(8, "0")}`;
    return orderWithNumber;
  }
}
