import { Item } from "../../src";
import ItemRepositoryMemory from "../../src/repositories/memory/ItemRepositoryMemory";
import { Shipping } from "../../src/entities/Shipping";

describe("Shipping tests", () => {
  const guitar = {
    _id: "1",
    description: "Guitar Yamaha 150",
    height: 100,
    length: 10,
    name: "Guitar",
    price: 1000,
    weight: 3,
    width: 30
  };

  const bass = {
    _id: "2",
    description: "Bass Yamaha 150",
    height: 100,
    length: 10,
    name: "Bass",
    price: 5000,
    weight: 3,
    width: 30
  };

  it("should calculate shipping cost when receives distancy and items", () => {
    const itemRepositoryMemory = new ItemRepositoryMemory();
    itemRepositoryMemory.save(new Item(guitar));
    itemRepositoryMemory.save(new Item(bass));
    const shippingProps = {
      density: itemRepositoryMemory.getTotalDensity(),
      distancy: 1000,
      minPrice: 10,
      volume: itemRepositoryMemory.getTotalVolume()
    };
    const shipping = new Shipping(shippingProps);
    expect(shipping.getPrice()).toBe(120);
  });
});
