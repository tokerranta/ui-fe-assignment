import { test, expect } from 'vitest';
import { Task } from './task';

test('should create a Task from a function', () => {
  const task = Task.from(() => Promise.resolve(42));
  expect(task).toBeDefined();
});

test('should map the result of the task', async () => {
  const task = Task.from(() => Promise.resolve(42));
  const mappedTask = task.map((value) => value.then((v) => v + 1));
  const result = await mappedTask.match({
    onOk: (value) => value,
    onError: (error) => error,
  });
  expect(result).toBe(43);
});

test('should flatMap the result of the task', async () => {
  const task = Task.from(() => Promise.resolve(42)).flatMap((value) =>
    Task.from(async () => value.then((v) => v + 1))
  );
  const result = await task.match({
    onOk: (value) => value,
    onError: (error) => error,
  });
  expect(result).toBe(43);
});

test('should handle errors in the task', async () => {
  const task = Task.from(() => Promise.reject(new Error('Test error')));
  const result = await task.match({
    onOk: (value) => value,
    onError: (error) => (error as Error).message,
  });
  expect(result).toBe('Test error');
});
