import OrderController from "./controllers/OrderController";
import { Item } from "./entities";
import ExpressAdapter from "./http/ExpressAdapter";
import ItemRepositoryMemory from "./repositories/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "./repositories/memory/OrderRepositoryMemory";
import Checkout from "./useCases/Checkout";
import GetOrdersByCPF from "./useCases/GetOrdersByCPF";
import Preview from "./useCases/Preview";

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

const itemRepository = new ItemRepositoryMemory();
itemRepository.save(new Item(guitar));
itemRepository.save(new Item(bass));
itemRepository.save(new Item(wire));
const orderRepository = new OrderRepositoryMemory();
const preview = new Preview(itemRepository);
const checkout = new Checkout(itemRepository, orderRepository);
const getOrderByCpf = new GetOrdersByCPF(orderRepository);
const httpServer = new ExpressAdapter();
new OrderController(httpServer, preview, checkout, getOrderByCpf);
httpServer.listen(3001);
