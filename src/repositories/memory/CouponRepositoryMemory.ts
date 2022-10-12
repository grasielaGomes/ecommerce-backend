import { Coupon, CouponI } from "../../entities";
import CouponRepository from "../interfaces/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];
  constructor() {
    this.coupons = [];
  }
  async getCoupon(couponId: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.couponId === couponId);
    if (!coupon) throw new Error("Coupon not found");
    return coupon;
  }
  async save(coupon: CouponI): Promise<void> {
    const newCoupon = new Coupon(coupon);
    this.coupons.push(newCoupon);
  }
}
