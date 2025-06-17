import { readFileSync } from 'fs';

type Effect<T> = () => T;

export class IO<A> {
  private constructor(private readonly effect: Effect<A>) {
    this.effect = effect;
  }
  static from<T>(effect: Effect<T>) {
    return new IO(effect);
  }
  map<B>(f: (val: A) => B): IO<B> {
    return new IO(() => f(this.effect()));
  }
  flatMap<B>(f: (val: A) => IO<B>): IO<B> {
    return new IO(() => f(this.effect()).effect());
  }
  execute<R1, R2>({
    onOk,
    onError,
  }: {
    onOk: (value: A) => R1;
    onError: (error: unknown) => R2;
  }): R1 | R2 {
    try {
      const result = this.effect();
      return onOk(result);
    } catch (error) {
      return onError(error);
    }
  }
}

export const readFile = (path: string) =>
  IO.from(() => readFileSync(path, 'utf-8'));
