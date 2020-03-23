import http from '../../services/http-service';
import { Converter } from './converter-reducer';

class ConverterApiService {
  public getSavedCurrencies(after?: any) {
    return http.get('converter', { params: { after: JSON.stringify(after) } });
  }
  public saveCurrency(converter: Pick<Converter, 'currency'>) {
    return http.post('converter/currency', converter);
  }
  public deleteCurrency(currencyId: string) {
    return http.delete(`converter/currency/${currencyId}`);
  }
}

export default new ConverterApiService();
