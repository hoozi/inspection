import { Toast, Portal } from '@ant-design/react-native';
import { getToken } from './token';
import { SERVICE_URL } from '../constants';
import store from '../store';

interface CodeMessage {
  [code: string]: string;
}

export interface ResponseData<T = any>  {
  code?:number;
  msg?:string;
  data?:T
};

export interface ApiOptions {
  onlyData?:boolean;
  isAuth?:boolean;
  loadingText?:string;
}

export type ResultData<T> = 
 | T
 | T[]
 | ResponseData<T[]>
 | ResponseData<T>
 | ResponseData

export type Options = RequestInit & ApiOptions;

const codeMessage:CodeMessage = {
  '200': '操作成功',
  '401': '用户没有权限',
  '403': '访问被禁止',
  '404': '资源不存在',
  '413': '上传的资源过大',
  '426': '用户名或密码错误',
  '428': '缺少请求参数',
  '500': '服务器发生错误',
  '502': '网关错误',
  '504': '网关超时',
  '999': '未知错误'
};

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext:string = codeMessage[response.status??999] || response.statusText;
  response.status != 401 && Toast.fail(`${errortext}(${response.status??999})`);
  throw response;
}

function prv(text:string, options?:Options):number {
  return Toast.loading(text, 0);
}

function parseData<T>(response: ResponseData, options?:ApiOptions):ResultData<T> | null {
  if(!response) {
    return null;
  } else {
    if(!response.hasOwnProperty('data')) {
      return response
    } else {
      return options?.onlyData ? response.data : response
    }
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request<T>(url: string, options?: Options): Promise<T> {
  let toastKey:number = -1;
  if(options?.loadingText) {
    toastKey = prv(options?.loadingText, options)
  }
  const token = await getToken();
  const newOptions: RequestInit = {
    credentials: 'include', 
    ...options
  };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  newOptions.headers = {
    ...newOptions.headers,
    Authorization: token ? `Bearer ${token}` : 'Basic YXBwOmFwcA=='
  }
  return fetch(`${SERVICE_URL}${url}`, newOptions)
    .then(checkStatus)
    .then(async (response:Response):Promise<any> => {
      Portal.remove(toastKey);
      try {
        const _response =  await response.json();
        return parseData<T>(_response, options)
      } catch(e) {
        return e;
      }  
    })
    .catch((response: Response) => {
      Portal.remove(toastKey);
      const { status } = response;
      const { dispatch } = store;
      if (status === 401 || status === 403) {
        dispatch.user.logout()
      }
    });
}