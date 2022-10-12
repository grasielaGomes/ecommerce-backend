import { Coupon, CouponI } from "../../entities";

export default interface CouponRepository {
  getCoupon(couponId: string): Promise<Coupon>;
  save(coupon: CouponI): Promise<void>;
}
