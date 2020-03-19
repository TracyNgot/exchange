import faunadb, { Client } from 'faunadb';

class Database {
  private client: Client;

  constructor() {
    this.initDatabase();
  }

  public getClient() {
    return this.client;
  }

  private initDatabase() {
    this.client = new faunadb.Client({ secret: process.env.MONEY_DB_KEY });
  }
}

export default new Database();
