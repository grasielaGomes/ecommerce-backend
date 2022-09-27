import { Coupons } from "../src/entities/Coupons";

describe("Coupons tests", () => {

  const allCoupons = [
    {
      couponId: "VALE25",
      percentage: 25
    },
    {
      couponId: "VALE5",
      percentage: 5
    }
  ];

  const coupons = new Coupons(allCoupons);


  it("should add coupon if receives a valid id and percentage", () => {
    const newCoupon = {
      couponId: "VALE20",
      percentage: 20
    };
    expect(coupons.addCoupon(newCoupon)).toBeDefined;
  });

  it("should throw an error if receives a invalid id", () => {
    const newCoupon = {
      couponId: "",
      percentage: 20
    };
    expect(() => coupons.addCoupon(newCoupon)).toThrow(
      new Error("invalid couponId")
    );
  });
  
  it("should throw an error if receives a invalid percentage", () => {
    const newCoupon = {
      couponId: "VALE50",
      percentage: -1
    };
    expect(() => coupons.addCoupon(newCoupon)).toThrow(
      new Error("invalid percentage")
    );
  });

  it("should return true if receives a valid coupon", () => {
    const newCoupon = {
      couponId: "VALE50",
      percentage: 20
    };
    coupons.addCoupon(newCoupon);
    expect(coupons.isValid("VALE20")).toBeTruthy;
  });

  it("should return false if receives an invalid coupon", () => {
    const newCoupon = {
      couponId: "VALE20",
      percentage: 20
    };
    coupons.addCoupon(newCoupon);
    expect(coupons.isValid("VALE10")).toBeFalsy;
  });

  it("should return a valid inputed coupon", () => {
    const coupon1 = {
      couponId: "VALE20",
      percentage: 20
    };
    const coupon2 = {
      couponId: "VALE30",
      percentage: 30
    };
    coupons.addCoupon(coupon1);
    coupons.addCoupon(coupon2);
    expect(coupons.getCoupon("VALE30")).toEqual(coupon2);
  });

  it("should return undefined if coupon doesn't exist", () => {
    const coupon1 = {
      couponId: "VALE20",
      percentage: 20
    };
    const coupon2 = {
      couponId: "VALE30",
      percentage: 30
    };
    coupons.addCoupon(coupon1);
    coupons.addCoupon(coupon2);
    expect(coupons.getCoupon("VALE10")).toEqual(undefined);
  });

  it("should delete a coupon", () => {
    const coupon1 = {
      couponId: "VALE20",
      percentage: 20
    };
    const coupon2 = {
      couponId: "VALE30",
      percentage: 30
    };
    coupons.addCoupon(coupon1);
    coupons.addCoupon(coupon2);
    coupons.deleteCoupon("VALE30");
    expect(coupons.getCoupon("VALE30")).toEqual(undefined);
  });
});
