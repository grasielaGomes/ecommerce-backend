import { CadastroPessoaFisica } from "../utils/Cpf";
import { ItemI } from "./Item";
import { OrderItem } from "./OrderItem";
import { Coupon } from "./Coupon";

export class Order {
  document: CadastroPessoaFisica;
  orderItems: OrderItem[];
  total: number;

  constructor(cpf: string) {
    this.document = new CadastroPessoaFisica(cpf);
    this.orderItems = [];
    this.total = 0;
  }
  private setTotal() {
    return this.orderItems.reduce<number>(
      (total, orderItem) => orderItem.getTotal() + total,
      0
    );
  }
  applyDiscount(coupon: Coupon): number {
    this.total = this.setTotal();
    const discount = coupon.applyCoupon(this.total);
    this.total -= discount;
    return discount;
  }

  addItem(item: ItemI, quantity: number) {
    const newOrderItem = { itemId: item._id, price: item.price, quantity };

    this.orderItems.push(new OrderItem(newOrderItem));
    return this.orderItems;
  }
}
