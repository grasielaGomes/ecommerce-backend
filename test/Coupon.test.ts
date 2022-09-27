import { Coupon } from "../src/entities/Coupon";

describe("Coupon tests", () => {
  it("should apply discount if receives a valid coupon and total", () => {
    const newCoupon = {
      couponId: "VALE20",
      percentage: 20
    };
    const coupon = new Coupon(newCoupon);
    expect(coupon.applyCoupon(5000)).toBeDefined;
  });

  it("should throw an error if receives an invalid id", () => {
    const newCoupon = {
      couponId: "",
      percentage: 20
    };
    expect(() => new Coupon(newCoupon)).toThrow(new Error("invalid couponId"));
  });

  it("should throw an error if receives an invalid percentage", () => {
    const newCoupon = {
      couponId: "VALE50",
      percentage: -1
    };
    expect(() => new Coupon(newCoupon)).toThrow(new Error("invalid percentage"));
  });

  it("should throw an error if receives an invalid date", () => {
    const newCoupon = {
      couponId: "VALE50",
      expiration: "abc",
      percentage: 50
    };
    expect(() => new Coupon(newCoupon)).toThrow(new Error("invalid date"));
  });
});
