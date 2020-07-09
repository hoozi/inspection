import { ViewStyle, TextStyle, StyleSheet } from 'react-native';

interface IEmptyStyle {
  centerContainer: ViewStyle;
  emptyText: TextStyle;
  textContainer: ViewStyle;
}

export default StyleSheet.create<IEmptyStyle>({
  centerContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color:'#84899c',
    textAlign: 'center',
    marginRight: 4
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})