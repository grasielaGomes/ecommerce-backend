export interface CouponI {
  couponId: string;
  percentage: number;
}

export class Coupon {
  readonly couponId: string;
  readonly percentage: number;

  constructor({ couponId, percentage }: CouponI) {
    this.couponId = this.validateId(couponId);
    this.percentage = this.validatePercentage(percentage);
  }

  applyCoupon (total: number): number {
    return total * this.percentage / 100;
  }

  private validateId(id: string): string {
    if (id) return id;
    throw new Error("invalid couponId");
  }

  private validatePercentage(value: number): number {
    if (value > 0) return value;
    throw new Error("invalid percentage");
  }
}
