export interface ItemI {
  _id: string;
  description: string;
  name: string;
  price: number;
}

export class Item {
  readonly _id: string;
  readonly description: string;
  readonly name: string;
  readonly price: number;

  constructor({ _id, description, name, price }: ItemI) {
    this._id = _id;
    this.description = description;
    this.name = name;
    this.price = price;
  }
}
