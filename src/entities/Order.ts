import { CadastroPessoaFisica } from "./Cpf";
import { ItemI } from "./Item";
import { OrderItem } from "./OrderItem";
import { Coupon } from "./Coupon";

export class Order {
  document: CadastroPessoaFisica;
  orderItems: OrderItem[];
  orderNumber: string | null;
  total: number;

  constructor(cpf: string) {
    this.document = new CadastroPessoaFisica(cpf);
    this.orderItems = [];
    this.orderNumber = null;
    this.total = 0;
  }

  addItem({ _id, price }: ItemI, quantity: number) {
    if (quantity <= 0)
      throw new Error("The quantity needs to be equal or greater than 1");

    if (this.hasItemInOrder(_id)) {
      this.increaseQuantity(_id);
      return this.orderItems;
    }

    const newOrderItem = { itemId: _id, price, quantity };
    this.orderItems.push(new OrderItem(newOrderItem));
    return this.orderItems;
  }

  applyDiscount(coupon: Coupon): number {
    this.total = this.getTotal();
    const discount = coupon.applyCoupon(this.total);
    this.total -= discount;
    return this.total;
  }

  getTotal(): number {
    return this.orderItems.reduce<number>(
      (total, orderItem) => orderItem.getTotal() + total,
      0
    );
  }

  private hasItemInOrder(id: string): boolean {
    return Boolean(this.orderItems.find((item) => item.itemId === id));
  }

  private increaseQuantity(id: string) {
    const item = this.orderItems.find(
      (item) => item.itemId === id
    ) as OrderItem;
    item.quantity += 1;
    const otherItems = this.orderItems.filter((item) => item.itemId !== id);
    this.orderItems = [item, ...otherItems];
  }
}
