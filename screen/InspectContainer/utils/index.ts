import { FieldData } from 'rc-field-form/es/interface';
import { CtnApply } from '../../../store/models/inspection';
import { isType } from '../../../shared/utils';

interface TransformFields {
  [key: string]: any
}

const fields: Array<string> = [
  'eir',
  'ctnNo',
  'numberPlate',
  'ctnOwner',
  'ctnSizeType',
  'normalFlag'
]


export const createFields = (data:CtnApply):Array<FieldData> => {
  const returnFields: Array<FieldData> = [];
  Object.keys(data).forEach(key => {
    if(!fields.includes(key)) return;
    const transformFields:TransformFields = {
      ctnOwner: typeof data[key] === 'string' ? [data[key]] : data[key],
      ctnSizeType: typeof data[key] === 'string' ? [data[key]] : data[key],
      normalFlag: typeof data[key] === 'string' ? data[key] === 'N' : data[key],
      ctnNo: typeof data[key] === 'string' ? data[key].toLocaleUpperCase() : data[key]
    }
    const field = {
      name: key,
      value: transformFields.hasOwnProperty(key) ? transformFields[key] : data[key]
    }
    returnFields.push(field);
  });
  return returnFields;
} 

export const transformPostData = (data:CtnApply):CtnApply => {
  Object.keys(data).forEach(key => {
    if(!fields.includes(key)) return;
    const transformFields:TransformFields = {
      ctnOwner: isType(data[key], 'Array') ? data[key][0] : data[key],
      ctnSizeType: isType(data[key], 'Array') ? data[key][0] : data[key],
      normalFlag: isType(data[key], 'Boolean') ? (data[key] ? 'N' : 'Y') : data[key]
    }
    data[key] = transformFields.hasOwnProperty(key) ? transformFields[key] : (data[key] === undefined ? '' : data[key])
  });
  return data;
};

