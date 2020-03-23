import { Expr } from 'faunadb';
import QueryBuilder from '../query-builder';

describe('QueryBuilder', () => {
  it('builds FaunaDB query', () => {
    expect(QueryBuilder.create('test', { id: 'my-test' })).toBeInstanceOf(Expr);
    expect(QueryBuilder.delete('test', 'id')).toBeInstanceOf(Expr);
    expect(QueryBuilder.get('test', 'id')).toBeInstanceOf(Expr);
    expect(QueryBuilder.select('test')).toBeInstanceOf(Expr);
    expect(
      QueryBuilder.selectWhereUnion({
        index: 'test',
        where: 'where',
        indexUnion: 'test2',
        whereUnion: 'where',
      }),
    ).toBeInstanceOf(Expr);
  });
});
