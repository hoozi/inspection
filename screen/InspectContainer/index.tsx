import * as React from 'react';
import {
  View,
  SafeAreaView,
  Text
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import InspectContainerForm from './components/Form';
import { PostAndPutModel } from '../../store/models/inspection';
import { ScreenNavigationProp, ScreenRouteProp } from 'interface';

export default ():React.ReactElement => {
  const { inspection } = useDispatch<RematchDispatch<Models>>();
  const { goBack } = useNavigation<ScreenNavigationProp<'EditInspectContainer'>>();
  const { params } = useRoute<ScreenRouteProp<'EditInspectContainer'>>();
  const type = params?.type;
  const handleSaveInspection = React.useCallback((values:PostAndPutModel, reset) => {
    inspection.postInspection({
      ...values,
      type,
      callback() {
        reset();
        type === 'put' && goBack();
      }
    })
  },[inspection])
  return (
    <SafeAreaView style={{flex:1}}>
      <WhenFocusStatusBar/>
      <InspectContainerForm onSave={handleSaveInspection}/>
    </SafeAreaView>
  )
}