export class Task<A> {
  /**
   * @private
   * @param {() => Promise<A>} task - The task function that returns a promise.
   */
  private constructor(private readonly task: () => Promise<A>) {}

  /**
   * Creates a new Task from a given task function.
   * @template A
   * @param {() => Promise<A>} task - The task function that returns a promise.
   * @returns {Task<A>} A new Task instance.
   */
  static from<A>(task: () => Promise<A>): Task<A> {
    return new Task(task);
  }

  /**
   * Transforms the result of the task using the provided function.
   * @template B
   * @param {(promise: Promise<A>) => Promise<B>} fn - The function to transform the task result.
   * @returns {Task<B>} A new Task instance with the transformed result.
   */
  map<B>(fn: (promise: Promise<A>) => Promise<B>): Task<B> {
    return Task.from(() => fn(this.task()));
  }

  /**
   * Transforms the result of the task using the provided function that returns a new Task.
   * @template B
   * @param {(promise: Promise<A>) => Task<B>} fn - The function to transform the task result into a new Task.
   * @returns {Task<B>} A new Task instance.
   */
  flatMap<B>(fn: (promise: Promise<A>) => Task<B>): Task<B> {
    return fn(this.task());
  }

  /**
   * Matches the result of the task with the provided handlers.
   * @template R1, R2
   * @param {Object} handlers - The handlers for different task states.
   * @param {(value: A) => R1} handlers.onOk - The function to call if the task succeeds.
   * @param {(error: ApiError) => R2} handlers.onError - The function to call if the task fails.
   * @returns {Promise<R1 | R2>} The result of the appropriate handler.
   */
  async match<R1, R2>({
    onOk,
    onError,
  }: {
    onOk: (value: A) => R1;
    onError: (error: unknown) => R2;
  }): Promise<R1 | R2> {
    try {
      const response = await this.task();
      return await onOk(response);
    } catch (err: unknown) {
      return onError(err);
    }
  }
}
