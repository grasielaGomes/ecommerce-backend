import { ItemI } from "../../entities";
import ItemRepository from "../interfaces/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: ItemI[];
  constructor() {
    this.items = [];
  }
  async getItem(idItem: string): Promise<ItemI> {
    const item = this.items.find((item) => item._id === idItem);
    if (!item) throw new Error("Item not found");
    return item;
  }

  async save(item: ItemI): Promise<void> {
    this.items.push(item);
  }
}
