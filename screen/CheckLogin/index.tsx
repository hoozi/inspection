import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { useFocusEffect } from '@react-navigation/native';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { color } from '../../constants';
import useCheckToken from './hook';

const Logout:React.FC<any> = ():React.ReactElement => {
  const [checkToken] = useCheckToken()
  useFocusEffect(
    checkToken
  )
  return (
    <SafeAreaView style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor={color.fillColor} hidden/>
      <ActivityIndicator color={color.brandColor} text='身份验证中...'/>
    </SafeAreaView>
  )
}

export default Logout