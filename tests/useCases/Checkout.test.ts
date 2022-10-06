import { Item } from "../../src/entities/Item";
import ItemRepositoryMemory from "../../src/repositories/memory/ItemRepositoryMemory";
import Checkout from "../../src/useCases/Checkout";
import OrderRepositoryMemory from "../../src/repositories/memory/OrderRepositoryMemory";
import GetOrdersByCPF from "../../src/useCases/GetOrdersByCPF";
import GetOrderByNumber from "../../src/useCases/GetOrderByNumber";

describe("Checkout tests", () => {
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

  const input = {
    cpf: "259.556.978-37",
    orderItems: [
      { idItem: "1", quantity: 1 },
      { idItem: "2", quantity: 1 },
      { idItem: "3", quantity: 3 }
    ]
  };

  it("should save an order and get orders by CPF", async () => {
    const itemRepositoryMemory = new ItemRepositoryMemory();
    const orderRepositoryMemory = new OrderRepositoryMemory();
    itemRepositoryMemory.save(new Item(guitar));
    itemRepositoryMemory.save(new Item(bass));
    itemRepositoryMemory.save(new Item(wire));
    const checkout = new Checkout(itemRepositoryMemory, orderRepositoryMemory);
    await checkout.execute(input);
    const getOrdersByCPF = new GetOrdersByCPF(orderRepositoryMemory);
    const orders = await getOrdersByCPF.execute("259.556.978-37");
    expect(orders.length).toBe(1);
    expect(orders[0]).toStrictEqual({ total: 6090 });
  });

  it("should save an order and get order by order number", async () => {
    const itemRepositoryMemory = new ItemRepositoryMemory();
    const orderRepositoryMemory = new OrderRepositoryMemory();
    itemRepositoryMemory.save(new Item(guitar));
    itemRepositoryMemory.save(new Item(bass));
    itemRepositoryMemory.save(new Item(wire));
    const checkout = new Checkout(itemRepositoryMemory, orderRepositoryMemory);
    await checkout.execute(input);
    const getOrderByNumber = new GetOrderByNumber(orderRepositoryMemory);
    const order = await getOrderByNumber.execute("202200000001");
    expect(order?.orderItems[0]).toEqual({
      itemId: "1",
      price: 1000,
      quantity: 1
    });
  });
});
