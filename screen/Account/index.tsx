import * as React from 'react';
import {
  View,
  SafeAreaView,
  Text
} from 'react-native';
import { Button } from '@ant-design/react-native';
import { useDispatch } from 'react-redux';
import { navigate } from '../../navigation';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { color } from '../../constants';

export default () => {
  const { user } = useDispatch()
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.brandColor}}>
      <WhenFocusStatusBar/>
      <Button onPress={() => user.logout()}>退出</Button>
    </SafeAreaView>
  )
}
