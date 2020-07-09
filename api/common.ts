import { stringify } from 'qs';
import request from '../shared/request';

interface GetDirParams {
  customerType:string;
}

export async function queryDir<T>(params: GetDirParams) {
  return request<T>(`/oms/customer/list?${stringify(params)}`, { onlyData:true });
}
export async function queryDirForCtnSizeType<T>() {
  return request<T>('/admin/dict/type/ctn_size', { onlyData: true });
}
export async function uploadImage<T>(params: FormData) {
  return request<T>('/yms/ctn-repair/appUpload', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    onlyData: true
  })
}
export async function downloadImage<T>(name: string) {
  return request<T>(`/yms/ctn-repair/getFile/${name}`);
}
export async function deleteImage<T>(name: string) {
  return request<T>(`/yms/ctn-repair/deleteMsg/${name}`, {
    method: 'DELETE'
  });
}