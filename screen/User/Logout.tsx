import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RematchDispatch,Models } from '@rematch/core';
import { useDispatch } from 'react-redux';
import { AppContext, AppContextProps } from '../../navigation';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { color } from '../../constants';

const Logout:React.FC<any> = ():React.ReactElement => {
  const { forceNavigationUpdate } = React.useContext<AppContextProps>(AppContext);
  const { user } = useDispatch<RematchDispatch<Models>>();
  useFocusEffect(
    React.useCallback(() => {
      forceNavigationUpdate(null);
    }, [user, forceNavigationUpdate])
  )
  return (
    <SafeAreaView style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor={color.fillColor} translucent/>
      <ActivityIndicator color={color.brandColor} text='正在退出，请稍候...'/>
    </SafeAreaView>
  )
}

export default Logout