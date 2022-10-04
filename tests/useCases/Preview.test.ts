import Preview from "../../src/useCases/Preview";
import { Item } from "../../src/entities/Item";
import ItemRepositoryMemory from "../../src/repositories/memory/ItemRepositoryMemory";

describe("Preview tests", () => {
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
  const wire = {
    _id: "3",
    description: "Guitar Wire",
    height: 1,
    length: 1,
    name: "wire",
    price: 30,
    weight: 1,
    width: 1
  };
  
  it("should return total", async () => {
    const itemRepositoryMemory = new ItemRepositoryMemory();
    itemRepositoryMemory.save(new Item(guitar));
    itemRepositoryMemory.save(new Item(bass));
    itemRepositoryMemory.save(new Item(wire));
    const preview = new Preview(itemRepositoryMemory);
    const input = {
      cpf: "259.556.978-37",
      orderItems: [
        { idItem: "1", quantity: 1 },
        { idItem: "2", quantity: 1 },
        { idItem: "3", quantity: 3 }
      ]
    };
    const total = await preview.execute(input);
    expect(total).toStrictEqual({ total: 6090 });
  });
});
