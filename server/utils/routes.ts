import { Request, Response } from 'express';
import { Converter, Exchange, Pocket, Rate } from '../controllers';

export interface Route {
  handler: (request: Request, response: Response) => any;
  path: string;
  type: 'get' | 'post' | 'put' | 'delete';
}

const routes: Route[] = [
  { type: 'get', path: 'pockets', handler: Pocket.getPockets },
  { type: 'get', path: 'pockets/:id', handler: Pocket.getPocket },
  { type: 'get', path: 'exchanges', handler: Exchange.getExchanges },
  { type: 'post', path: 'exchanges', handler: Exchange.createExchange },
  { type: 'get', path: 'rates', handler: Rate.getRates },
  { type: 'post', path: 'rates', handler: Rate.createRate },
  { type: 'delete', path: 'rates', handler: Rate.deleteRate },
  { type: 'get', path: 'converter', handler: Converter.getConverter },
  { type: 'post', path: 'converter/currency', handler: Converter.addCurrency },
  {
    type: 'delete',
    path: 'converter/currency/:id',
    handler: Converter.deleteCurrency,
  },
];

export default routes;
