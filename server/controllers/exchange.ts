import { Request, Response } from 'express';

import database from '../utils/database';
import { Controller } from './abstract';

export default class Exchange extends Controller {
  static async getExchanges(
    request: Request,
    response: Response,
  ): Promise<any> {
    try {
      const result = await database
        .getClient()
        .query(Exchange.queryBuilder.getCollection('exchanges'));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async createExchange(
    request: Request,
    response: Response,
  ): Promise<any> {
    try {
      ['from', 'to', 'created', 'amount', 'pocketId'].forEach(key => {
        if (!request.body[key]) throw new Error(`Missing ${key}`);
      });

      const { from, to, created, amount, pocketId } = request.body;
      const result = await database.getClient().query(
        Exchange.queryBuilder.create('exchanges', {
          from,
          to,
          created,
          amount,
          pocketId,
        }),
      );
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
