import { ModelEffects, ModelReducers } from '@rematch/core';
import { PostAndPutModel } from './inspection';
import { queryHistory } from '../../api/history';

export interface HistoryData extends PostAndPutModel {}

interface HistoryPayload {
  callback?():void;
}

export interface History {
  data: Array<HistoryData>
}

const state:History = {
  data:[]
}
const reducers:ModelReducers<History> = {
  save(state, payload) {
    return Object.assign(state, payload)
  }
}
const effects:ModelEffects<History> = {
  async fetchHistory(payload:HistoryPayload) {
    const { callback, ...restPayload } = payload??{};
    const response = await queryHistory<HistoryData>(restPayload);
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