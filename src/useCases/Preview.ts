import { Order } from "../entities";
import ItemRepository from "../repositories/interfaces/ItemRepository";
import CouponRepository from "../repositories/interfaces/CouponRepository";

export default class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) {}

  async execute(input: Input): Promise<number> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    if(input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      return order.applyDiscount(coupon);
    }
    return order.getTotal();
  }
}

type Input = {
  coupon?: string;
  cpf: string;
  orderItems: { idItem: string; quantity: number }[];
};
