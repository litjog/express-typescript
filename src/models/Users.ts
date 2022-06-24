import userSchema from '../common/userSchema';
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

interface CallbackFn {
  (user: Pick<User, 'name' | 'age'>): boolean;
}

type Where = Partial<Pick<User, 'id' | 'username'>>;

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
    try {
      const userInput = userSchema.parse({ name, username, age });

      if (this.isExist({ username: userInput.username })) {
        throw new HttpError('User already registered', 409);
      }

      const id: number = this.currentId++;
      const createdAt: string = getCurrentDate();
      const updatedAt: string = createdAt;
      const user: User = { id, createdAt, updatedAt, ...userInput };

      this.list.push(user);
      return user;
    } catch (e) {
      throw e;
    }
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
    try {
      if (!this.isExist({ id })) {
        throw new HttpError('User not found', 404);
      }

      const user = this.selectById(id);
      const userInput = userSchema.parse({ name, username, age });

      if (this.isExist({ username: userInput.username })) {
        if (user?.username !== userInput.username) {
          throw new HttpError('User already registered', 409);
        }
      }

      const updatedUser: User | undefined = this.list.find(
        (user: User): boolean => {
          const isMatch: boolean = user.id === id;

          if (isMatch) {
            user.name = userInput.name;
            user.username = userInput.username;
            user.age = userInput.age;
            user.updatedAt = getCurrentDate();
          }

          return isMatch;
        }
      );

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }

  public selectAll(): User[] {
    return this.list;
  }

  public selectMany(callbackFn: CallbackFn): User[] {
    return this.list.filter(({ name, age }: User) => callbackFn({ name, age }));
  }

  public selectOne(where: Where): User | undefined {
    const [key] = Object.keys(where) as (keyof Where)[];
    return this.list.find((user: User) => user[key] === where[key]);
  }

  public selectById(id: number): User | undefined {
    if (!this.isExist({ id })) {
      throw new HttpError('User not found', 404);
    }

    return this.selectOne({ id });
  }

  public isExist(where: Where): boolean {
    const [key] = Object.keys(where) as (keyof Where)[];
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
