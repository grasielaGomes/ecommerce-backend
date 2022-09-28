export interface ItemI {
  _id: string;
  description: string;
  height: number;
  length: number;
  name: string;
  price: number;
  weight: number;
  width: number;
}

interface DimensionsI {
  dimension: number;
  type?: string;
}

export class Item {
  readonly _id: string;
  readonly description: string;
  readonly height: number;
  readonly length: number;
  readonly name: string;
  readonly price: number;
  readonly weight: number;
  readonly width: number;

  constructor({
    _id,
    description,
    height,
    length,
    name,
    price,
    weight,
    width
  }: ItemI) {
    this._id = _id;
    this.description = description;
    this.height = this.validateDimension({ dimension: height, type: "Height" });
    this.length = this.validateDimension({ dimension: length, type: "Length" });
    this.name = name;
    this.price = price;
    this.weight = this.validateDimension({ dimension: weight, type: "Weight" });
    this.width = this.validateDimension({ dimension: width, type: "Width" });
  }

  getVolume() {
    return (this.height / 100) * (this.width / 100) * (this.length / 100);
  }

  getDensity() {
    return this.weight / this.getVolume();
  }

  private validateDimension({ dimension, type = "Value" }: DimensionsI) {
    if (dimension > 0) return dimension;
    throw new Error(`${type} needs to be greater than 0`);
  }
}
