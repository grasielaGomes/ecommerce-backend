import { Shipping } from "../src/entities/Shipping";

describe("Shipping tests", () => {
  it("should calculate shipping based on distancy and item dimensions", () => {
    const density = 100;
    const distancy = 1000;
    const volume = 0.03;
    const shipping = new Shipping({ density, distancy, volume });
    expect(shipping.getPrice()).toEqual(30);
  });

  it("should return minPrice if shipping calculation returns less than it", () => {
    const density = 333;
    const distancy = 1000;
    const minPrice = 10;
    const volume = 0.003;
    const shipping = new Shipping({ density, distancy, minPrice, volume });
    expect(shipping.getPrice()).toEqual(minPrice);
  });
});
