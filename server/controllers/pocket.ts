import { Request, Response } from 'express';

import database from '../utils/database';
import { checkProperties } from '../utils/helpers';
import { Controller } from './abstract';

export default class Pocket extends Controller {
  static async getPockets(request: Request, response: Response) {
    try {
      const { after, size } = request.query;
      const result = await database
        .getClient()
        .query(Pocket.queryBuilder.select('allPockets', { after, size }));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async getPocket(request: Request, response: Response) {
    try {
      checkProperties(['id'], request.params);

      const { id } = request.params;
      const result = await database
        .getClient()
        .query(Pocket.queryBuilder.get('pockets', id));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async createPocket(request: Request, response: Response) {
    try {
      checkProperties(['currency'], request.body);

      const { currency } = request.body;
      const result = await database
        .getClient()
        .query(
          Pocket.queryBuilder.create('converter', { currency, amount: 0 }),
        );

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
