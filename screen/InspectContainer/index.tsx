import * as React from 'react';
import {
  View,
  SafeAreaView,
  Text
} from 'react-native';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import InspectContainerForm from './components/Form';
import { PostAndPutModel } from '../../store/models/inspection';

export default ():React.ReactElement => {
  const handleSaveInspection = (values:PostAndPutModel) => {
    console.log(values.ctnRepairParamsList[0]._photos,values.ctnRepairParamsList[0].photos)
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <WhenFocusStatusBar/>
      <InspectContainerForm onSave={handleSaveInspection}/>
    </SafeAreaView>
  )
}