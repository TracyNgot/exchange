import { Request, Response } from 'express';

import database from '../utils/database';
import { Controller } from './abstract';

export default class Pocket extends Controller {
  static async getPockets(request: Request, response: Response): Promise<any> {
    try {
      const result = await database
        .getClient()
        .query(Pocket.queryBuilder.getCollection('pockets'));
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  static async getPocket(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      if (!id) throw new Error('Missing id');

      const result = await database
        .getClient()
        .query(Pocket.queryBuilder.get(id));
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
