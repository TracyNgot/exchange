import database from '../database';

describe('Database', () => {
  it("returns an unique client's instance", () => {
    expect(database.getClient()).toBe(database.getClient());
  });
});
