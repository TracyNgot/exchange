import http from '../../services/http-service';
import { Exchange } from './exchange-reducer';

class ExchangeApiService {
  public getExchangesByPocketId(pocketId: string, after?: any) {
    return http.get(`pockets/${pocketId}/exchanges`, {
      params: { after: JSON.stringify(after) },
    });
  }
  public createExchange(exchange: Exchange) {
    return http.post('exchanges', exchange);
  }
}

export default new ExchangeApiService();
