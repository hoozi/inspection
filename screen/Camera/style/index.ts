  
import { StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { color } from '../../../constants';

interface ICameraStyle {
  container: ViewStyle;
  preview: ViewStyle;
  capture: ViewStyle;
  closeCamera: ViewStyle
}

export default StyleSheet.create<ICameraStyle>({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    padding: 8,
    alignSelf: 'center',
    margin: 20,
  },
  closeCamera: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 10,
    width: 24, 
    height: 24, 
    borderRadius: 24,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff'
  }
});