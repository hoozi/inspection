import * as React from 'react';
import { View,Image,Text,TouchableOpacity } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { ActivityIndicator } from '@ant-design/react-native';
import CaiNiao from '../../../icon/CaiNiao';
import { color } from '../../../constants';
import styles from './style';

interface ImageGridProps extends FastImageProps {
  source: Source;
  uploading?: boolean;
  parentId?: number;
  downloading?: boolean;
}

export default ({
  uploading=false,
  downloading=false,
  parentId=0,
  ...imageProps
}:ImageGridProps) => {
  const { common } = useDispatch<RematchDispatch<Models>>();
  return (
    <View style={styles.breakageImageContainer}>
      {
        uploading ? 
        <View style={styles.maskUploading}>
          <ActivityIndicator size='small' color='#fff'/>
          <Text style={styles.maskUploadingText}>上传中</Text>
        </View> : 
        <TouchableOpacity style={styles.deleteImage} onPress={() => common.deleteImage({id:parentId, photo:imageProps.source.uri})}>
          <CaiNiao name='cuowuguanbiquxiao' color='#fff' size={12}/>
        </TouchableOpacity>
      }
      <FastImage style={styles.breakageImage} resizeMode={FastImage.resizeMode.cover} {...imageProps}/>
    </View>
  )
}