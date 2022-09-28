import { Item } from "../src/entities/Item";

describe("Item tests", () => {
  const guitar = {
    _id: "XKi890",
    description: "Guitar Yamaha 150",
    height: 100,
    length: 10,
    name: "Guitar",
    price: 4900,
    weight: 3,
    width: 30
  };

  it("should throw an error if height is less or equal to zero", () => {
    expect(() => new Item({...guitar, height: 0})).toThrow(
      new Error("Height needs to be greater than 0")
    );
  });

  it("should throw an error if width is less or equal to zero", () => {
    expect(() => new Item({...guitar, width: 0})).toThrow(
      new Error("Width needs to be greater than 0")
    );
  });

  it("should throw an error if length is less or equal to zero", () => {
    expect(() => new Item({...guitar, length: 0})).toThrow(
      new Error("Length needs to be greater than 0")
    );
  });

  it("should throw an error if weight is less or equal to zero", () => {
    expect(() => new Item({...guitar, weight: 0})).toThrow(
      new Error("Weight needs to be greater than 0")
    );
  });

  it("should calculate item volume", () => {
    const newItem = new Item(guitar)
    expect(newItem.getVolume()).toEqual(0.03);
  });

  it("should calculate item density", () => {
    const newItem = new Item(guitar);
    expect(newItem.getDensity()).toEqual(100);
  });
});
