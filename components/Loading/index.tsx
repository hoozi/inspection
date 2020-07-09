import React from 'react';
import {
  View
} from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { ActivityIndicatorNativeProps } from '@ant-design/react-native/lib/activity-indicator';

interface ILoadingProps extends ActivityIndicatorNativeProps {}

export default (props:ILoadingProps):React.ReactElement => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator {...props}/>
    </View>
  )
}