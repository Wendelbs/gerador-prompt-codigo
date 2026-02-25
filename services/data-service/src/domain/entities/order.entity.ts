export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public version: number,
  ) {}
}
