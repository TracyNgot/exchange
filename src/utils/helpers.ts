import dayjs from 'dayjs';
import { Pocket } from '../store/pockets/pocket-reducer';
import { Exchange } from '../store/exchanges/exchange-reducer';

export interface Data {
  date: number;
  id: string;
}

export function transformToData<T>({ ref, data, ts }: any): T {
  return { id: ref['@ref'].id, ...data, date: ts };
}

export function expandPockets(exchange: Exchange, pockets: Pocket[]): Exchange {
  const from = pockets.find(({ id }) => id === exchange.from) || exchange.from;
  const to = pockets.find(({ id }) => id === exchange.to) || exchange.to;

  return { ...exchange, from, to };
}

export function toFormattedDate(ts: number, format = 'LLL') {
  return dayjs(ts / 1000).format(format);
}
