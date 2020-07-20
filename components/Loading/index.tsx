import React from 'react';
import {
  View
} from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { ActivityIndicatorNativeProps } from '@ant-design/react-native/lib/activity-indicator';

interface LoadingProps extends ActivityIndicatorNativeProps {}

export default (props:LoadingProps):React.ReactElement => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator {...props}/>
    </View>
  )
}