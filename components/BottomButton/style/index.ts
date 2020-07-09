import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { color } from '../../../constants';
import { border } from '../../../style';

interface Buttons {
  container: ViewStyle;
  extraText: TextStyle;
  buttonGroup: ViewStyle
}

export default StyleSheet.create<Buttons>({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    position: 'absolute', 
    bottom:0, 
    backgroundColor: '#fff',
    width:'100%', 
    ...border(`${StyleSheet.hairlineWidth} 0 0 0`)
  },
  extraText: {
    paddingLeft: 12, 
    color:color.warningColor, 
    fontSize: 18
  },
  buttonGroup: {
    flexDirection: 'row'
  }
})