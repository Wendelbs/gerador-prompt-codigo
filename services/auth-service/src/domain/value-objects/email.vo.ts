export class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(normalized)) {
      throw new Error('E-mail inválido');
    }
    return new Email(normalized);
  }

  getValue(): string {
    return this.value;
  }
}
