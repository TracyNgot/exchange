import { Request, Response } from 'express';

import database from '../utils/database';
import Pocket from './pocket';
import { Controller } from './abstract';
import { checkProperties } from '../utils/helpers';

export default class Exchange extends Controller {
  static async getExchangesByPocket(request: Request, response: Response) {
    try {
      const { after, size } = request.query;
      checkProperties(['pocketId'], request.params);
      const { pocketId } = request.params;
      const result = await database.getClient().query(
        Exchange.queryBuilder.selectWhereUnion(
          {
            index: 'allExchangesByPocketFrom',
            where: pocketId,
            indexUnion: 'allExchangesByPocketTo',
            whereUnion: pocketId,
          },
          {
            after,
            size,
          },
        ),
      );
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async createExchange(request: Request, response: Response) {
    try {
      checkProperties(['from', 'to', 'amount', 'rate'], request.body);

      const { from, to, amount, rate } = request.body;
      await database.getClient().query(
        Exchange.queryBuilder.create('exchanges', {
          from,
          to,
          amount,
          rate,
        }),
      );
      const fromPocket: any = await database
        .getClient()
        .query(Pocket.queryBuilder.get('pockets', from));
      const toPocket: any = await database
        .getClient()
        .query(Pocket.queryBuilder.get('pockets', to));

      await database.getClient().query(
        Pocket.queryBuilder.update('pockets', from, {
          amount: fromPocket.data.amount - amount,
        }),
      );
      await database.getClient().query(
        Pocket.queryBuilder.update('pockets', to, {
          amount: toPocket.data.amount + amount * rate,
        }),
      );
      response.status(201).send();
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
