import { stringify } from 'qs';
import request from '../shared/request';
import { LoginPayload } from '../store/models/user';

export async function queryToken<T>(params:LoginPayload) {
  return request<T>(`/auth/oauth/token?${stringify(params)}`, {
    method: 'POST',
    loadingText: '登录中...'
  });
}
export async function queryCurrentUser<T>() {
  return request<T>('/admin/user/info', { onlyData: true })
}