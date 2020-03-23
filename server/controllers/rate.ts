import { Request, Response } from 'express';

import database from '../utils/database';
import { checkProperties } from '../utils/helpers';
import { Controller } from './abstract';

export default class Rate extends Controller {
  static async getRates(request: Request, response: Response) {
    try {
      const { after, size } = request.query;
      const result = await database
        .getClient()
        .query(Rate.queryBuilder.select('allRates', { after, size }));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async createRate(request: Request, response: Response) {
    try {
      checkProperties(['from', 'to'], request.body);

      const { from, to } = request.body;
      const result = await database
        .getClient()
        .query(Rate.queryBuilder.create('rates', { from, to }));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async deleteRate(request: Request, response: Response) {
    try {
      checkProperties(['id'], request.params);

      const { id } = request.params;
      const result = await database
        .getClient()
        .query(Rate.queryBuilder.delete('rates', id));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
