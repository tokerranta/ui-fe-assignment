export const take =
  <T>(n: number) =>
  (arr: T[]) => {
    if (n < 0) {
      throw new Error('Cannot take a negative number of elements');
    }
    return arr.slice(0, n);
  };

export const skip =
  (n: number) =>
  <T>(arr: T[]) => {
    if (n < 0) {
      throw new Error('Cannot skip a negative number of elements');
    }
    return arr.slice(n);
  };
