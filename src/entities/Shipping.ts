export interface ShippingI {
  density: number;
  distancy?: number;
  minPrice?: number;
  volume: number;
}

export class Shipping {
  readonly density: number;
  readonly distancy: number;
  readonly minPrice: number;
  readonly volume: number;

  constructor({ density, distancy = 1000, minPrice = 0, volume }: ShippingI) {
    this.density = density;
    this.distancy = distancy;
    this.minPrice = minPrice;
    this.volume = volume;
  }

  getPrice(): number {
    const price = this.distancy * this.volume * (this.density / 100);
    return price > this.minPrice ? price : this.minPrice;
  }
}
