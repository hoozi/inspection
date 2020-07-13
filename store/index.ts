import { init, Plugin, Middleware, RematchStore, ExtractRematchDispatchersFromEffects, Models } from '@rematch/core';
import { Reducer } from 'redux';
import createLoadingPlugin, { LoadingConfig } from '@rematch/loading';

interface IRootReducer {
  [key:string]: Reducer<any, any>
}
export interface IRedux {
  middlewares?:Middleware[];
  reducers?:IRootReducer
}

const options:LoadingConfig = {};

const loadingPlugin:Plugin = createLoadingPlugin(options)

import common, { Common as CommonState } from './models/common';
import user, { User as UserState } from './models/user';
import inspection, { Inspection as InspectionState } from './models/inspection';
import history, { History as HistoryState } from './models/history';

const models = {
  common,
  user,
  inspection,
  history
}

export type RootModels = typeof models;

export interface LoadingState<M extends Models> {
  global: boolean,
  models: { [modelName in keyof M]: boolean },
  effects: {
    [modelName in keyof M]: {
      [effectName in keyof ExtractRematchDispatchersFromEffects<M[modelName]['effects']>]: boolean
    }
  }
}

export type RootState = {
  common: CommonState;
  user: UserState;
  inspection: InspectionState;
  history: HistoryState;
  loading: LoadingState<RootModels>
}



const store:RematchStore = init({
  models,
  plugins: [loadingPlugin]
});

export default store;