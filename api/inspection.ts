import { stringify } from 'qs';
import request from '../shared/request';
import { PostAndPutModel } from '../store/models/inspection';

interface GetRateParams {
  shipownerCode: string;
}

export async function postInspection<T>(body:PostAndPutModel, type:string = 'add') {
  return request<T>(`/yms/ctn-apply/${type === 'add' ? 'appCheck' : 'updateCheck'}`, {
    method: 'POST',
    loadingText: '正在保存...',
    body
  });
}
export async function queryRateByCtnOwner<T>(params:GetRateParams) {
  return request<T>(`/bms/fee-shipowner-rate/checkGetList?${stringify(params)}`, { onlyData: true });
}
export async function queryApplyByCtnNo<T>(ctnNo: string) {
  return request<T>(`/yms/ctn-apply/checkGetByCtnNo?ctnNo=${ctnNo}`, { onlyData: true });
}