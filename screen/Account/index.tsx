import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, List, ActionSheet } from '@ant-design/react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from '../../constants';
import { RootState, RootModels } from '../../store';
import { ScreenNavigationProp } from '../../interface';
import styles from './style';

export default () => {
  const { user } = useDispatch<RematchDispatch<RootModels>>();
  const { sysUser } = useSelector((state:RootState) => state.user);
  const handleShowActionSheet = React.useCallback(() => {
    ActionSheet.showActionSheetWithOptions({
      title: `确定要退出${sysUser.username}吗？`,
      options: ['退出', '取消'],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 0
    },
    buttonIndex => {
      if(buttonIndex === 0) {
        user.logout();
      }
    })
  }, [])
  return (
    <SafeAreaView style={{flex:1}}>
      <WhenFocusStatusBar barStyle='light-content' backgroundColor={color.brandColor}/>
      <View style={styles.accountCard}>
        <Image source={require('../../static/avatar.png')} style={styles.avatar}/>
        <Text style={styles.accountTitle}>你好，{sysUser.username}</Text>
      </View>
      <List>
        <List.Item thumb={<Entypo name='mobile' size={16} color={color.warningColor}/>} extra={sysUser.phone}>
          <Text style={{fontSize: 15, paddingLeft:4}}>手机号</Text>
        </List.Item>
      </List>
      <Button onPress={handleShowActionSheet} style={styles.logoutButton}>
        <Text style={{color:'#ff5b05', fontSize: 16}}>退出登录</Text>
      </Button>
    </SafeAreaView>
  )
  
}