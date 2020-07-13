  
import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { color } from '../../../constants';

interface LoginStyle {
  container: ViewStyle;
  loginTitle: ViewStyle;
  loginForm: ViewStyle;
  textInput: ViewStyle;
  loginItem: ViewStyle;
  loginButton: ViewStyle;
  appIconContainer: ViewStyle;
  appIcon: ImageStyle;
}

export default StyleSheet.create<LoginStyle>({
  container: {
    flex: 1,
    backgroundColor: color.fillColor
  },
  loginTitle: {
    fontSize: 24,
    color: color.textBaseColor,
    marginBottom: 32,
    fontWeight: '600'
  },
  loginForm: {
    flex:1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  textInput: {
    paddingLeft: 8,
    flex:1,
    fontSize: 14,
    padding: 0,
    margin: 0,
    color: color.textBaseColor
  },
  loginItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    //paddingHorizontal: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 42
  },
  loginButton: {
    width: '100%',
    marginTop: 52
  },
  appIconContainer: {
    width: 56, 
    height: 56, 
    borderRadius:4,
    overflow: 'hidden', 
    marginBottom: 16
  },
  appIcon: {
    width: 56,
    height: 56
  }
})