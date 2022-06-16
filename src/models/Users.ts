import getCurrentDate from '../helpers/getCurrentDate';
import HttpError from '../httpError';

export interface User {
  id: number;
  name: string;
  username: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export default class Users {
  private currentId: number = 1;
  private list: User[] = [];

  constructor() {}

  public insert({
    name,
    username,
    age,
  }: {
    name: string;
    username: string;
    age: number;
  }): User {
    if (this.isExist({ username })) {
      throw new HttpError('User already registered', 400);
    }

    const id: number = this.currentId++;
    const createdAt: string = getCurrentDate();
    const updatedAt: string = createdAt;
    const user: User = { id, name, username, age, createdAt, updatedAt };

    this.list.push(user);
    return user;
  }

  public update({
    id,
    name,
    username,
    age,
  }: {
    id: number;
    name: string;
    username: string;
    age: number;
  }): User | undefined {
    if (!this.isExist({ id })) {
      throw new HttpError('User not found', 404);
    }

    const user = this.selectById(id);

    if (this.isExist({ username })) {
      if (user.username !== username) {
        throw new HttpError('Username already registered', 400);
      }
    }

    const updatedUser: User | undefined = this.list.find(
      (user: User): boolean => {
        const isMatch: boolean = user.id === id;

        if (isMatch) {
          user.name = name;
          user.username = username;
          user.age = age;
          user.updatedAt = getCurrentDate();
        }

        return isMatch;
      }
    );

    return updatedUser;
  }

  public selectAll(): User[] {
    return this.list;
  }

  public selectMany(where: { name?: string; age?: number }): User[] {
    const key = Object.keys(where)[0];
    return this.list.filter((user: User) => user[key] === where[key]);
  }

  public selectOne(where: {
    id?: number;
    username?: string;
  }): User | undefined {
    const key = Object.keys(where)[0];
    return this.list.find((user: User) => user[key] === where[key]);
  }

  public selectById(id: number): User | undefined {
    if (!this.isExist({ id })) {
      throw new HttpError('User not found', 404);
    }

    return this.selectOne({ id });
  }

  public isExist(where: { id?: number; username?: string }): boolean {
    const key = Object.keys(where)[0];
    return this.list.some((user: User) => user[key] === where[key]);
  }

  public delete(id: number): void {
    if (!this.isExist({ id })) {
      throw new HttpError('User not found', 404);
    }

    this.list = Array.from(
      this.list.filter((user: User): boolean => user.id !== id)
    );
  }
}
