import * as React from 'react';
import { Text } from 'react-native';
import {
  List,
  InputItem,
  Picker,
  Switch
} from '@ant-design/react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { ListItemProps } from '@ant-design/react-native/lib/list/ListItem';
import { InputItemProps } from '@ant-design/react-native/lib/input-item';
import { PickerProps } from '@ant-design/react-native/lib/picker';
import { PickerData } from '@ant-design/react-native/lib/picker/PropsType';
import { AntmSwitchProps } from '@ant-design/react-native/lib/switch';
import { InternalFieldProps } from 'rc-field-form/es/Field';
import { Field } from 'rc-field-form';
import { color } from '../../../constants';
import { commonStyles } from '../../../style';

type ComponentInternalProps = | ListItemProps | InputItemProps | PickerProps | AntmSwitchProps

interface FormItem {
  name: string;
  title: string | React.ReactElement;
  component: React.ComponentType<any>;
  componentProps: ComponentInternalProps | ((props:any) => ComponentInternalProps);
  isField?:boolean;
  options?: InternalFieldProps;
}

type Handle = (value:any) => void;

export interface PropsFromParent {
  onSearchEir: Handle;
  onSearchApply: Handle;
  onCtnOwnerChange: Handle;
  eirExtra: React.ReactElement;
  ctnNoExtra: React.ReactNode;
  ctnOwnerData: Array<PickerData>;
  ctnOwnerExtra: React.ReactNode;
  ctnSizeTypeData: Array<PickerData>;
  ctnSizeTypeExtra: React.ReactNode;
}

const InputItemBaseProps:InputItemProps = {
  placeholder: '请输入',
  clear: true
}

const isField:boolean = true;

const createFormItem = ({
  onSearchEir,
  onSearchApply,
  onCtnOwnerChange,
  eirExtra,
  ctnNoExtra,
  ctnOwnerData,
  ctnSizeTypeData,
  ctnOwnerExtra,
  ctnSizeTypeExtra
}:PropsFromParent):Array<FormItem> => (
  [
    /* {
      name: 'eir',
      title: 'EIR',
      component: InputItem,
      isField,
      componentProps:{
        ...InputItemBaseProps,
        returnKeyType: 'search',
        onSubmitEditing: e => {
          onSearchEir(e.nativeEvent.text)
        },
        extra: eirExtra
      }
    }, */
    {
      name: 'ctnNo',
      title: '箱号',
      component: InputItem,
      isField,
      componentProps:{
        ...InputItemBaseProps,
        placeholder: '请输入',
        returnKeyType: 'search',
        onSubmitEditing: e => {
          onSearchApply(e.nativeEvent.text)
        },
        extra: ctnNoExtra
      }
    },
    {
      name: 'numberPlate',
      title: '车牌号',
      component: InputItem,
      isField,
      componentProps:InputItemBaseProps
    },
    {
      name: 'ctnOwner',
      title: (
        <List.Item arrow={<Entypo name='chevron-thin-right' color='#999' size={14} style={{paddingLeft: 2}}/>}>
          <Text style={commonStyles.fieldName}>箱主</Text>
        </List.Item>
      ),
      component: Picker,
      isField,
      componentProps: {
        data: ctnOwnerData,
        onChange: onCtnOwnerChange,
        itemStyle: {
          paddingVertical: 6
        },
        actionTextUnderlayColor: '#f5f5f5',
        cols: 1,
        extra: ctnOwnerExtra
      }
    },
    {
      name: 'ctnSizeType',
      title: (
        <List.Item arrow={<Entypo name='chevron-thin-right' color='#999' size={14} style={{paddingLeft: 2}}/>}>
          <Text style={commonStyles.fieldName}>箱型尺寸</Text>
        </List.Item>
      ),
      component: Picker,
      isField,
      componentProps: {
        data: ctnSizeTypeData,
        itemStyle: {
          paddingVertical: 6
        },
        actionTextUnderlayColor: '#f5f5f5',
        cols: 1,
        extra: ctnSizeTypeExtra
      }
    },
    {
      name: 'normalFlag',
      title: '是否坏箱',
      component: List.Item,
      componentProps: {
        children: <Text style={commonStyles.fieldName}>是否坏箱</Text>,
        extra: (
          <Field 
            name='normalFlag' 
            valuePropName='checked'
          >
            <Switch
                color={color.brandColor}
              />
          </Field>
        )
      }
    }
  ] 
);
export type {
  PickerData
};
export default createFormItem;