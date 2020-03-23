import { Request, Response } from 'express';

import database from '../utils/database';
import { checkProperties } from '../utils/helpers';
import { Controller } from './abstract';

export default class Converter extends Controller {
  static async getConverter(request: Request, response: Response) {
    try {
      const { after, size } = request.query;
      const result = await database
        .getClient()
        .query(Converter.queryBuilder.select('allCurrencies', { after, size }));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async addCurrency(request: Request, response: Response) {
    try {
      checkProperties(['currency'], request.body);

      const { currency } = request.body;
      const result = await database
        .getClient()
        .query(Converter.queryBuilder.create('converter', { currency }));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async deleteCurrency(request: Request, response: Response) {
    try {
      checkProperties(['id'], request.params);

      const { id } = request.params;
      const result = await database
        .getClient()
        .query(Converter.queryBuilder.delete('converter', id));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
