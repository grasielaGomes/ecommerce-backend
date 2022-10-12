import { ItemI, Item } from "../../entities";
import ItemRepository from "../interfaces/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];
  constructor() {
    this.items = [];
  }
  async getItem(idItem: string): Promise<Item> {
    const item = this.items.find((item) => item._id === idItem);
    if (!item) throw new Error("Item not found");
    return item;
  }

  async save(item: ItemI): Promise<void> {
    const newItem = new Item(item);
    this.items.push(newItem);
  }

  getTotalVolume(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.getVolume();
    }
    return total;
  }

  getTotalDensity(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.getDensity();
    }
    return total;
  }
}
