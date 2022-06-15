export default class User {
  constructor(private name: string) {}

  public greet() {
    return `Hello there user ${this.name}`;
  }
}
