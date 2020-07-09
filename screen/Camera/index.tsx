import React, { useCallback } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RematchDispatch,Models } from '@rematch/core';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { getFileName } from '../../shared/utils';
import Loading from '../../components/Loading';
import CaiNiao from '../../icon/CaiNiao';
import { color } from '../../constants';
import styles from './style';

interface IProps {
  route?:any
}

export default ({route}:IProps):React.ReactElement => {
  const { breakageId } = route.params;
  const { common, examine } = useDispatch<RematchDispatch<Models>>();
  const { goBack } = useNavigation();
  const takePicture = async function (camera:RNCamera) {
    const options = { quality: 0.5, base64: false };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    const { uri } = data;
    const formData = new FormData();
    formData.append('file', {uri, name: uri, type: 'image/jpeg'});
    common.upload({
      formData,
      uri,
      id: breakageId
      //index
    });
    goBack();
  }
  const handleScan = useCallback((eir:string) => {
    examine.saveEir({
      eir
    });
    goBack();
  }, [examine, goBack])
  return (
    <SafeAreaView style={styles.container}>
      <WhenFocusStatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,1)'/>
      <TouchableHighlight style={styles.closeCamera} underlayColor='#ccc' onPress={() => goBack()}>
        <CaiNiao name='cuowuguanbiquxiao' color={color.textBaseColor} size={16}/>
      </TouchableHighlight>
      {
        
        <RNCamera
          style={styles.preview}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          type={RNCamera.Constants.Type.back}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <Loading/>;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableHighlight underlayColor='#f5f5f5' style={styles.capture} onPress={() => takePicture(camera)}>
                  <CaiNiao name='paizhao' size={48} color={color.textBaseColor}/>
                </TouchableHighlight>
              </View>
            );
          }}
        </RNCamera>
      }
      
    </SafeAreaView>
  )
}
