it('should have been initialized dotenv', () => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  expect(TOKEN_SECRET).not.toBe(null);
  expect(TOKEN_SECRET).not.toBe(undefined);
});