import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native';
import { color } from '../../../constants';

interface AccountStyle {
  accountCard: ViewStyle;
  avatar: ImageStyle;
  accountTitle: TextStyle;
  logoutButton: ViewStyle;
}

export default StyleSheet.create<AccountStyle>({
  accountCard: {
    flexDirection: 'row', 
    paddingHorizontal: 12, 
    height: 100, 
    alignItems: 'center', 
    backgroundColor: color.brandColor
  },
  avatar: {
    width: 64, 
    height: 64, 
    borderRadius: 64, 
    borderWidth: 4, 
    borderColor: color.brandColorTap
  },
  accountTitle: {
    marginLeft: 12,
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16
  },
  logoutButton: {
    borderWidth:0,
    borderRadius:0, 
    marginTop: 12,
    height: 42
  }
})