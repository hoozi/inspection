import { stringify } from 'qs';
import request from '../shared/request';

interface GetCheckParams {

}

export async function queryHistory<T>(params: GetCheckParams) {
  return request<T>(`/yms/ctn-apply/getCheck?${stringify(params)}`, { onlyData: true });
}