import { ModelEffects, ModelReducers,RematchDispatch,Models } from '@rematch/core';
import { toHump, copy } from '../../shared/utils';
import { queryDir, queryDirForCtnSizeType, uploadImage, downloadImage, deleteImage } from '../../api/common'
import { RootState } from '../index';

export interface CtnOwner {
  id: number;
  bank: string;
  bankNo: string;
  contacts: string;
  contactsTel: string;
  createTime: string;
  createUser: string;
  customerBrief: string;
  customerCode: string;
  customerName: string;
  remark: string;
  superiorUnit: string;
  taxNo: string;
  updateTime: string;
  updateUser: string;
}

export interface UploadingData {
  [key: string]: boolean
}

export interface Common {
  ctnOwner: Array<CtnOwner>;
  ctnSizeType:Array<{label:string, value:string}>;
  images:Array<string>;
  uploadings: UploadingData
}

interface UploadPayload {
  formData: FormData;
  index:number;
  id: string;
  uri: string;
}

const state:Common = {
  ctnOwner:[],
  images: [],
  ctnSizeType: [],
  uploadings: {}
}
const reducers:ModelReducers<Common> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  },
  saveUploadings(state, payload) {
    const { id, uploading } = payload;
    const uploadings = copy<UploadingData>(state.uploadings);
    uploadings[id] = uploading;
    return Object.assign({}, state, {
      uploadings
    });
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchDirByType(customerType:string) {
    const response = await queryDir<Array<CtnOwner>>({customerType});
    if(response) {
      this.save({[`${toHump(customerType)}`]:response})
    }
  },
  async fetchDirForCtnSizeType() {
    const response = await queryDirForCtnSizeType<Array<{label:string, value:string}>>();
    if(response) {
      this.save({ctnSizeType:response})
    }
  },
  async upload(payload:UploadPayload) {
    const { formData, id, uri } = payload;
    this.saveUploadings({
      id:uri,
      uploading: true
    });
    dispatch.inspection.updatePhotos({
      id,
      photo: uri
    })
    const response = await uploadImage<Array<string>>(formData);
    if(response) {
      this.saveUploadings({
        id:uri,
        uploading: false
      });
      dispatch.inspection.updatePhotos({
        id,
        photo: response[0],
        local: false
      })
      /* dispatch.examine.changeBreakage({
        index,
        photos: [...response]
      }) */
    }
  },
  async downloadImage(name:string) {
    const response = await downloadImage<string>(name);
    return response
  },
  async deleteImage(name: string) {
    await deleteImage<string>(name);
  }
})

export default {
  state,
  reducers,
  effects
}