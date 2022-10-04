import { ItemI } from "../../entities";

export default interface ItemRepository {
  getItem(idItem: string): Promise<ItemI>;
  save(item: ItemI): Promise<void>;
}
