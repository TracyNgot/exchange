import faunadb from 'faunadb';
import Expr from 'faunadb/src/types/Expr';

const q = faunadb.query;

export default class QueryBuilder {
  static create(collectionName: string, data: any): Expr {
    return q.Create(q.Collection(collectionName), { data });
  }

  static delete(index: string): Expr {
    return q.Delete(q.Index(index));
  }

  static get(index: string): Expr {
    return q.Get(q.Index(index));
  }

  static getCollection(name: string): Expr {
    return q.Get(q.Collection(name));
  }
}
