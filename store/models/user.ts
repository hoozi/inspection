import { StackActions, CommonActions } from '@react-navigation/native';
import { ModelReducers, ModelEffects } from '@rematch/core';
import { navigate, navigationDispatch } from '../../navigation';
import { queryToken, queryCurrentUser } from '../../api/user';
import { setToken, removeToken } from '../../shared/token';
import { encryption } from '../../shared/utils';
import { RootState } from '../index';

interface SysUser {
  avatar: string;
  createTime: string;
  delFlag:string;
  deptId: number;
  lockFlag: string;
  password: string;
  phone: string;
  qqOpenid: string;
  tenantId: number;
  updateTime: string;
  userId: number;
  username: string;
  wxOpenid: string
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
}

export interface User {
  permissions: string[];
  sysUser:Partial<SysUser>;
  roles: number[];
}

export interface LoginPayload {
  username: string;
  password: string;
  code: string;
  randomStr?: number;
  callback?(tk:string):void;
  [key:string]: any
}

interface LoginParams extends LoginPayload {
  grant_type: string
  scope: string
}

const state:User = {
  permissions: [''],
  sysUser:{},
  roles: []
}
const reducers:ModelReducers<Partial<User>> = {
  save(state, payload:Partial<User>) {
    return Object.assign({}, state, payload)
  }
}
const effects:ModelEffects<RootState> = {
  async login(payload:LoginPayload) {
    const { callback, ...restPayload } = payload;
    const randomStr = Number(Date.now());
    const encryptioned = encryption<LoginPayload>({
      data:{ ...restPayload, randomStr},
      key:'weihuangweihuang',
      param: ['password']
    });
    const params:LoginParams = {
      ...restPayload,
      randomStr,
      grant_type: 'password',
      scope: 'server',
      password: encryptioned.password
    };
    const token = await queryToken<UserToken>(params);
    if(token) {
      await setToken(token.access_token);
      callback && callback(token.access_token);
    }
  },
  async fetchCurrentUser()  {
    const currentUser = await queryCurrentUser<User>();
    if(currentUser) {
      this.save(currentUser);
    }
  },
  async logout() {
    await removeToken();
    navigationDispatch(state =>{ 
      const index:number = state.routes.findIndex(route => route.name === 'Login');
      if(index === -1) {
        return StackActions.replace('Logout');
      } else {
        return CommonActions.reset(state);
      }
    })
  }
}

export default {
  state,
  reducers,
  effects
}