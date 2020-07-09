import * as React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text
} from 'react-native';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';

export default () => (
  <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <WhenFocusStatusBar/>
    <Text>History</Text>
  </SafeAreaView>
)