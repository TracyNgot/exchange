import { Request, Response } from 'express';

import database from '../utils/database';
import { Controller } from './abstract';

export default class Rate extends Controller {
  static async getRates(request: Request, response: Response): Promise<any> {
    try {
      const result = await database
        .getClient()
        .query(Rate.queryBuilder.getCollection('rates'));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async createRate(request: Request, response: Response): Promise<any> {
    try {
      ['from', 'to', 'created'].forEach(key => {
        if (!request.body[key]) throw new Error(`Missing ${key}`);
      });

      const { from, to, created } = request.body;
      const result = await database
        .getClient()
        .query(Rate.queryBuilder.create('rates', { from, to, created }));
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async deleteRate(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      if (!id) throw new Error('Missing id');

      const result = await database
        .getClient()
        .query(Rate.queryBuilder.delete(id));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
