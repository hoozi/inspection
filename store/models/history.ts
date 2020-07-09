import { stringify } from 'qs';
import { ModelEffects, ModelReducers } from '@rematch/core';
import request from '../../shared/request';
import { TApi } from './api.type';

export interface IData {
  ctnApply: ICtnApply;
  ctnRepairParamsList: Array<IBreakage>;
  [key:string]: any
}

export interface ICtnApply {
  id?:number;
  ctnNo:string;
  ctnOwner:string;
  numberPlate: string;
  eir: string;
  normalFlag: string;
  ctnSizeType:string;
  repairFee: number;
}

export interface IBreakage {
  id?:number;
  componentCname: string;
  repairName: string;
  length: number;
  width:number;
  customerRate:number;
  photos: Array<string>;
  [key:string]: any;
}

interface IGetCheckParams {

}

interface IHistoryPayload {
  callback?():void;
}

interface IState {
  data: Array<IData>
}

const api:TApi = {
  async queryCheck(params: IGetCheckParams) {
    return request(`/yms/ctn-apply/getCheck?${params}`, { onlyData: true });
  }
}

const state:IState = {
  data:[]
}
const reducers:ModelReducers<IState> = {
  save(state, payload) {
    return Object.assign(state, payload)
  }
}
const effects:ModelEffects<IState> = {
  async fetchCheck(payload:IHistoryPayload) {
    const { callback, ...restPayload } = payload??{};
    const response = await api.queryCheck<IData>(restPayload);
    if(response) {
      this.save({data:response});
      callback && callback();
    }
  }
}

export default {
  state,
  reducers,
  effects
}