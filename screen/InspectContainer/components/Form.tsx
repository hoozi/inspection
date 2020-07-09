import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  List,
  ActivityIndicator
} from '@ant-design/react-native';
import Form, { useForm, Field } from 'rc-field-form';
import { RematchDispatch,Models } from '@rematch/core';
import { color } from '../../../constants';
import CaiNiao from '../../../icon/CaiNiao';
import createFormItem, { PickerData,PropsFromParent } from './createFormItem';
import { RootState } from '../../../store';
import { PostAndPutModel } from '../../../store/models/inspection';
import BottomButton from '../../../components/BottomButton';
import { createFields, transformPostData } from '../utils';
import Breakages from './Breakages';
import Price from '../../../components/Price';
import { CtnOwner } from '../../../store/models/common';

interface FormProps {
  onSave:(values:PostAndPutModel)=>void;
}

const inspectionSelector = createSelector(
  (state:RootState) => state.inspection.ctnApply,
  (state:RootState) => state.inspection.ctnRepairParamsList,
  (state:RootState) => state.loading,
  (state:RootState) => state.common.ctnOwner,
  (state:RootState) => state.common.ctnSizeType,
  (ctnApply, ctnRepairParamsList, loading, ctnOwner, ctnSizeType) => ({
    ctnApply,
    ctnRepairParamsList,
    loading,
    ctnOwner,
    ctnSizeType
  })
)

export default ({
  onSave
}: FormProps):React.ReactElement => {
  const { inspection } = useDispatch<RematchDispatch<Models>>();
  const { ctnApply, ctnRepairParamsList, loading, ctnOwner, ctnSizeType } = useSelector(inspectionSelector);
  const [form] = useForm();
  const { validateFields,getFieldValue,resetFields } = form;
  const eirSearching:boolean = false;
  const applySearching:boolean = loading.effects.inspection.fetchApplyByCtnNo;
  const ctnSizeTypeSearching:boolean = loading.effects.common.fetchDirForCtnSizeType;
  const ctnOwnerSearching:boolean = loading.effects.common.fetchDirByType;
  const handleSaveInspection = React.useCallback(async ():Promise<void> => {
    try {
      const values = await validateFields();
      const newCtnApply = transformPostData({
        ...ctnApply,
        ...values
      })
      onSave && onSave({
        ctnApply: newCtnApply,
        ctnRepairParamsList
      })
    } catch(e) {}
  }, [validateFields, transformPostData, onSave])

  const handleInspectionRest = React.useCallback(() => {
    resetFields();
    inspection.reset();
  },[inspection])

  const handleSearchEir = (eir:string):void => {
    console.log(eir)
  }
  const eirExtra = React.useMemo<React.ReactElement>(() => (
    eirSearching ? 
    <ActivityIndicator size='small' color={color.brandColor}/> :
    <CaiNiao 
      name='saomiao' 
      size={24} 
      color={color.brandColor} 
      onPress={() => console.log('scan')}
    />
  ),[eirSearching]);
  
  const handleSearchApply = (ctnNo:string):void => {
    inspection.fetchApplyByCtnNo(ctnNo);
  }
  const ctnNoExtra = React.useMemo<React.ReactNode>(() => (
    applySearching ? 
    <ActivityIndicator size='small' color={color.brandColor}/> :
    null
  ),[applySearching]);
  
  const handleCtnOwnerChange = React.useCallback((ctnOwner:Array<string>):void => {
    inspection.fetchRateByCtnOwner(ctnOwner[0]);
  }, [inspection]);
  const ctnOwnerData = React.useMemo<Array<PickerData>>(() => (
    ctnOwner?.map((owner:CtnOwner) => ({
        label:owner.customerBrief,
        value:owner.customerCode
      }))??[]
  ), [ctnOwner]);
  const ctnOwnerExtra = React.useMemo<React.ReactNode>(() => (
    ctnOwnerSearching ? 
    <ActivityIndicator size='small' color={color.brandColor}/> :
    '请选择'
  ), [ctnOwnerSearching])
  
  const ctnSizeTypeData = React.useMemo<Array<PickerData>>(() => ctnSizeType, [ctnSizeType]);
  const ctnSizeTypeExtra = React.useMemo<React.ReactNode>(() => (
    ctnSizeTypeSearching ? 
    <ActivityIndicator size='small' color={color.brandColor}/> :
    '请选择'
  ), [ctnSizeTypeSearching])

  const propsFromParent:PropsFromParent = {
    onSearchEir: handleSearchEir, 
    onSearchApply: handleSearchApply,
    onCtnOwnerChange: handleCtnOwnerChange, 
    eirExtra, 
    ctnNoExtra,
    ctnOwnerData,
    ctnOwnerExtra,
    ctnSizeTypeData,
    ctnSizeTypeExtra
  }
  return (
    <View style={{flex:1}}>
      <ScrollView style={{flex:1,marginBottom: 50}} keyboardShouldPersistTaps='always'>
        <Form 
          form={form}
          component={false}
          fields={createFields(ctnApply)}
          onValuesChange={changedValues => inspection.updateCtnApply(changedValues)}
        >
          <List>
            {
              createFormItem(propsFromParent).map(item => {
                return (
                  item.isField ?
                  <Field key={item.name} name={item.name} {...item.options}>
                    <item.component {...item.componentProps}>
                      {
                        typeof item.title === 'string' ?
                        <Text>{item.title}</Text> :
                        item.title
                      }
                    </item.component>
                  </Field> :
                  <item.component {...item.componentProps} key={item.name}/>
                )
              })
            }
          </List>
        </Form>
        {
          (getFieldValue('normalFlag')!==undefined && getFieldValue('normalFlag')) ? <Breakages/> : null
        }
       </ScrollView>
       <BottomButton
        extra={<Price total={ctnApply.repairFee}/>}
        buttons={[
          {
            text:<Text style={{fontSize: 14, color:color.brandColor}}>表单重置</Text>,
            onPress: handleInspectionRest,
            style: {
              borderRadius: 0,
              borderWidth:0,
              borderLeftWidth: StyleSheet.hairlineWidth
            }
          },
          {
            text:<Text style={{fontSize: 14}}>验箱保存</Text>,
            type: 'primary',
            onPress: handleSaveInspection,
            style: {
              borderRadius: 0
            }
          }
        ]}
      />
    </View>
   
  )
}