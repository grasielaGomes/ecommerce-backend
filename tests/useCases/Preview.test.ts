import Preview from "../../src/useCases/Preview";
import { Item } from "../../src/entities/Item";
import ItemRepositoryMemory from "../../src/repositories/memory/ItemRepositoryMemory";
import CouponRepositoryMemory from "../../src/repositories/memory/CouponRepositoryMemory";
import { CouponI } from "../../src/entities/Coupon";

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

  const coupon20: CouponI = {
    couponId: "VALE20",
    expiration: "2022-12-31",
    percentage: 20
  };
  const itemRepositoryMemory = new ItemRepositoryMemory();
  itemRepositoryMemory.save(new Item(guitar));
  itemRepositoryMemory.save(new Item(bass));
  itemRepositoryMemory.save(new Item(wire));

  const couponRepositoryMemory = new CouponRepositoryMemory();
  couponRepositoryMemory.save(coupon20);
  const preview = new Preview(itemRepositoryMemory, couponRepositoryMemory);

  it("should return total", async () => {
    const input = {
      cpf: "259.556.978-37",
      orderItems: [
        { idItem: "1", quantity: 1 },
        { idItem: "2", quantity: 1 },
        { idItem: "3", quantity: 3 }
      ]
    };
    const total = await preview.execute(input);
    expect(total).toBe(6090);
  });

  it("should return total with discount", async () => {
    const input = {
      cpf: "259.556.978-37",
      orderItems: [
        { idItem: "1", quantity: 1 },
        { idItem: "2", quantity: 1 },
        { idItem: "3", quantity: 3 }
      ],
      coupon: "VALE20"
    };
    const total = await preview.execute(input);
    expect(total).toBe(4872);
  });
});
