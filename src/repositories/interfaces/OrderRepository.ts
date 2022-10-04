import { Order } from "../../";

export default interface OrderRepository {
  save(order: Order): Promise<void>
}