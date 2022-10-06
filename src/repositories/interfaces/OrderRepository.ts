import { Order } from "../../";

export default interface OrderRepository {
  getByCPF(cpf: string): Promise<Order[] | null>;
  getByNumber(orderNumber: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}