import { Coupon } from "../src/domain/Coupon";
import { Order } from "../src/domain/Order";

describe("Creating orders", () => {
  const product1 = {
    _id: "1",
    description: "Description 1",
    height: 100,
    length: 10,
    name: "guitar",
    price: 1000,
    weight: 3,
    width: 30
  };

  const product2 = {
    _id: "2",
    description: "Description 2",
    height: 20,
    length: 10,
    name: "camera",
    price: 2000,
    weight: 1,
    width: 15
  };

  const product3 = {
    _id: "3",
    description: "Description 3",
    height: 200,
    length: 50,
    name: "refrigerator",
    price: 500,
    weight: 40,
    width: 100
  };

  it("should not create an order if CPf is invalid", () => {
    const invalidCPF = "111111111-11";
    const newOrder = new Order(invalidCPF);
    expect(() => newOrder.document.isValid()).toThrow(new Error("invalid CPF"));
  });

  it("should not create an order if the quantity is less than 1", () => {
    const cpf = "259.556.978-37";
    const newOrder = new Order(cpf);
    expect(() => newOrder.addItem(product1, 0)).toThrow(
      new Error("The quantity needs to be equal or greater than 1")
    );
  });

  it("should not create the same product twice but increase the quantity", () => {
    const cpf = "259.556.978-37";
    const newOrder = new Order(cpf);
    newOrder.addItem(product1, 1);
    newOrder.addItem(product1, 1);
    newOrder.addItem(product1, 1);
    expect(newOrder.orderItems).toEqual([
      { itemId: "1", price: 1000, quantity: 3 }
    ]);
  });

  it("should create an order with 3 items including description, price and quantity", () => {
    const cpf = "259.556.978-37";
    const newOrder = new Order(cpf);
    newOrder.addItem(product1, 1);
    newOrder.addItem(product2, 1);
    newOrder.addItem(product3, 2);
    expect(newOrder.orderItems).toEqual([
      { itemId: "1", price: 1000, quantity: 1 },
      { itemId: "2", price: 2000, quantity: 1 },
      { itemId: "3", price: 500, quantity: 2 }
    ]);
  });

  it("should create an order and apply a discount coupom", () => {
    const cpf = "259.556.978-37";
    const newOrder = new Order(cpf);
    const coupon = { couponId: "VALE25", percentage: 25 };
    newOrder.addItem(product1, 1);
    newOrder.addItem(product2, 1);
    newOrder.addItem(product3, 2);
    expect(newOrder.applyDiscount(new Coupon(coupon))).toBe(1000);
    expect(newOrder.total).toBe(3000);
  });
});
