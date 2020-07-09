import * as React from 'react';
import { View,Image,Text,ImageSourcePropType } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import styles from './style';

interface ImageGridProps {
  source: ImageSourcePropType;
  uploading?: boolean;
}

export default ({
  source,
  uploading=false
}:ImageGridProps) => {
  return (
    <View style={styles.breakageImageContainer}>
      {
        uploading ? 
        <View style={styles.maskUploading}>
          <ActivityIndicator size='small' color='#fff'/>
          <Text style={styles.maskUploadingText}>上传中</Text>
        </View> : null
      }
      <Image source={source} style={styles.breakageImage}/>
    </View>
  )
}