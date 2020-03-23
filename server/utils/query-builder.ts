import faunadb from 'faunadb';
import Expr from 'faunadb/src/types/Expr';

const q = faunadb.query;

export default class QueryBuilder {
  static buildReference(collection: string, index: string) {
    return q.Ref(q.Collection(collection), index);
  }

  static create(collectionName: string, data: any): Expr {
    return q.Create(q.Collection(collectionName), { data });
  }

  static delete(collection: string, index: string): Expr {
    return q.Delete(QueryBuilder.buildReference(collection, index));
  }

  static get(collection: string, index: string): Expr {
    return q.Get(QueryBuilder.buildReference(collection, index));
  }

  static select(index: string, { after, size }: any = {}): Expr {
    return q.Map(
      q.Paginate(q.Match(q.Index(index)), { size: size || 30, after }),
      q.Lambda('X', q.Get(q.Var('X'))),
    );
  }

  static selectWhereUnion(
    { index, where, indexUnion, whereUnion },
    { after, size }: any = {},
  ): Expr {
    return q.Map(
      q.Paginate(
        q.Union(
          q.Match(q.Index(index), where),
          q.Match(q.Index(indexUnion), whereUnion),
        ),
        { size: size || 100, after },
      ),
      q.Lambda('X', q.Get(q.Var('X'))),
    );
  }

  static update(collection: string, index: any, data: any) {
    return q.Update(q.Ref(q.Collection(collection), index), { data });
  }
}
