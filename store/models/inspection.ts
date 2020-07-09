import { ModelEffects, ModelReducers } from '@rematch/core';
import groupBy from 'lodash/groupBy';
import unionBy from 'lodash/unionBy';
import { queryApplyByCtnNo, queryRateByCtnOwner, postExamine } from '../../api/inspection';
import { copy } from '../../shared/utils';
import { Toast } from '@ant-design/react-native';
import { RootState } from '../index';

const listToTree = (list: Array<Breakage>): Array<Rate> => {
  const returnTree:Array<Rate> = [];
  
  return returnTree;
}

export interface Rate {
  label?: string;
  value?: string;
  children?:RateChildren[]
}

interface RateChildren {
  label: string;
  value: string;
  price?:number;
  children?: RateChildren[];
}

export interface PostAndPutModel {
  ctnApply: CtnApply;
  ctnRepairParamsList: Array<Breakage>;
}

interface PostAndPutModelPayload extends PostAndPutModel{
  type: string;
  callback?():void
}

export interface CtnApply {
  id?:number;
  ctnNo:string;
  ctnOwner:string | Array<string>;
  numberPlate: string;
  eir: string;
  normalFlag: boolean | string;
  ctnSizeType:string | Array<string>;
  repairFee: number;
  [key: string]: any;
}

export interface Breakage {
  id?:number;
  componentCname: string;
  repairName: string;
  length: number;
  width:number;
  customerRate:number;
  photos: Array<string>;
  _photos: Array<string>;
  [key:string]: any;
}

export interface Inspection extends PostAndPutModel {
  rate:Array<Breakage>;
  treeRate:Array<Rate>;
}

const initialCtnApply:PostAndPutModel = {
  ctnApply: {
    id:undefined,
    ctnNo:'',
    numberPlate: '',
    ctnOwner: '',
    eir: '',
    normalFlag: 'Y', 
    ctnSizeType: '',
    repairFee: 0   
  },
  ctnRepairParamsList: []
}

const state:Inspection = {
  ...copy<PostAndPutModel>(initialCtnApply),
  rate:[],
  treeRate:[]
}
export const reducers:ModelReducers<Inspection> = {
  save(state, payload) {
    return Object.assign({}, state, payload)
  },
  updateCtnApply(state,payload) {
    return Object.assign({}, state,{
      ctnApply: {
        ...state.ctnApply,
        ...payload
      }
    })
  },
  reset() {
    return Object.assign({}, state, initialCtnApply)
  },
  computedFee(state) {
    const repairFee = state.ctnRepairParamsList.reduce((sum, cur) => sum+cur.customerRate, 0);
    return Object.assign({}, state, {
      ctnApply: {
        ...state.ctnApply,
        repairFee
      }
    })
  },
  updateBreakages(state, payload) {
    const { breakage, id=-1, type='update' } = payload;
    const newCtnRepairParamsList = [...state.ctnRepairParamsList];
    const index = !newCtnRepairParamsList.length ? -1 : newCtnRepairParamsList.findIndex(breakage => id === breakage.id);
    if(index>-1) {
      if(type === 'delete') {
        newCtnRepairParamsList.splice(index, 1);
      } else if(type === 'update') {
        newCtnRepairParamsList.splice(index, 1, breakage);
      }
    } else {
      newCtnRepairParamsList.unshift(breakage);
    }
    return Object.assign({}, state, {
      ctnRepairParamsList: [...newCtnRepairParamsList]
    })
  },
  updatePhotos(state, payload) {
    const { id, photo, type = 'add', local=true } = payload;
    const newCtnRepairParamsList = [...state.ctnRepairParamsList];
    const lIndex = newCtnRepairParamsList.findIndex(breakage => id === breakage.id);
    const currentCtnRepairParamsList = newCtnRepairParamsList.filter(item => item.id === id)[0];
    const newPhotos = [...currentCtnRepairParamsList[local?'_photos':'photos']];
    const pIndex = newPhotos.findIndex(item => item === photo);
    if(type === 'add') {
      newPhotos.push(photo);
    } else {
      newPhotos.splice(pIndex, 1);
    }
    const changedCtnRepairParamsList = {
      ...currentCtnRepairParamsList,
      [`${local?'_photos':'photos'}`]: newPhotos
    }
    newCtnRepairParamsList.splice(lIndex, 1, changedCtnRepairParamsList);
    return Object.assign({}, state, {
      ctnRepairParamsList: newCtnRepairParamsList
    })
  }
}
const effects:ModelEffects<RootState> = {
  async fetchApplyByCtnNo(ctnNo) {
    const response = await queryApplyByCtnNo<CtnApply>(ctnNo);
    if(response) {
      this.updateCtnApply(response);
      if(response.ctnOwner) {
        this.fetchRateByCtnOwner(response.ctnOwner);
      }
    }
  },
  async fetchRateByCtnOwner(shipownerCode:string) {
    const response = await queryRateByCtnOwner<Breakage[]>({shipownerCode});
    let treeRate: Array<Rate> = [];
    if(response && response.length) {
      const componentGroup = groupBy(response, 'componentCname');
      for(let c in componentGroup) {
        const componentItem = componentGroup[c];
        const repairGroup = groupBy(componentItem, 'repairName');
        treeRate.push({
          label: c,
          value: c,
          children: []
        })
        for(let r in repairGroup) {
          const repairItem = repairGroup[r];
          treeRate[treeRate.length-1].children?.push({
            label: r,
            value: r,
            children: unionBy(repairItem.map(rep => {
              return {
                label:`${rep.length}x${rep.width}`,
                value:`${rep.length}x${rep.width}`
              }
            }), 'label')
          })
        }
      }
    }
    this.save({treeRate, rate:response})
  },
  async postExamine(payload:PostAndPutModelPayload) {
    const { callback, type='add', ...restPayload } = payload
    const response = await postExamine<any>(restPayload, type);
    if(response.code===0) {
      Toast.success('保存成功',3,() => {
        callback && callback()
      })
    }
  }
}

export default {
  state,
  reducers,
  effects
}