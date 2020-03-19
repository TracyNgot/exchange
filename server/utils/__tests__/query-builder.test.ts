import { Expr } from 'faunadb';
import QueryBuilder from '../query-builder';

describe('QueryBuilder', () => {
  it('builds FaunaDB query', () => {
    expect(QueryBuilder.create('test', { id: 'my-test' })).toBeInstanceOf(Expr);
    expect(QueryBuilder.delete('test')).toBeInstanceOf(Expr);
    expect(QueryBuilder.get('test')).toBeInstanceOf(Expr);
    expect(QueryBuilder.getCollection('test')).toBeInstanceOf(Expr);
  });
});
