export interface CouponI {
  couponId: string;
  expiration?: Date | string | number;
  percentage: number;
}

export class Coupon {
  readonly couponId: string;
  readonly expiration?: Date | string | number;
  readonly percentage: number;

  constructor({ couponId, expiration, percentage }: CouponI) {
    this.couponId = this.validateId(couponId);
    this.expiration = expiration && this.validateDate(expiration);
    this.percentage = this.validatePercentage(percentage);
  }

  applyCoupon(total: number): number {
    return (total * this.percentage) / 100;
  }

  private validateDate(value: Date | string | number) {
    const date = new Date(value).toString();
    if (date !== "Invalid Date") return new Date(value);
    throw new Error("invalid date");
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
