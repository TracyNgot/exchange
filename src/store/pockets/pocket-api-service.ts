import http from '../../services/http-service';
import { Pocket } from './pocket-reducer';

class PocketApiService {
  public getPockets(after?: any) {
    return http.get('pockets', { params: { after: JSON.stringify(after) } });
  }
  public createPocket(pocket: Pick<Pocket, 'currency'>) {
    return http.post('pockets', pocket);
  }
}

export default new PocketApiService();
