export class Acknowledgment {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public message: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public version: number,
  ) {}
}
