import { Coupon, CouponI } from "./Coupon";

export class Coupons {
  private validCoupons: CouponI[];
  constructor(coupons?: CouponI[]) {
    this.validCoupons = [...coupons || []];
  }

  isValid(value: string): boolean {
    return Boolean(
      this.validCoupons.find((coupon) => coupon.couponId === value)
    );
  }

  getCoupon(id: string): CouponI {
    return this.validCoupons.filter((coupon) => coupon.couponId === id)[0];
  }

  addCoupon(coupon: CouponI) {
    const newCoupon = new Coupon(coupon);
    this.validCoupons.push(newCoupon);
  }

  deleteCoupon(couponId: string) {
    this.validCoupons = this.validCoupons.filter(
      (coupon) => coupon.couponId !== couponId
    );
  }
}
