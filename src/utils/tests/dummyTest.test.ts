const sum = (a: number, b: number): number => {
  return a + b;
};

it("should pass a dummy test", () => {
  expect(sum(1, 1)).toEqual(2);
});

export {};
