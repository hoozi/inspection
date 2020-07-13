import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { border } from '../../../style';

interface HistoryStyle {
  cardContainer: ViewStyle;
  cardHeader: ViewStyle;
  cardContent: ViewStyle;
  cardContentItem: TextStyle;
  cardFooter: ViewStyle;
}

export default StyleSheet.create<HistoryStyle>({
  cardContainer: {
    padding: 12, 
    marginTop:12, 
    backgroundColor: '#fff',
    borderRadius: 4,
    ...border(`${StyleSheet.hairlineWidth}`)
  },
  cardHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  cardContent: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginVertical: 12,
    borderRadius:4, 
    backgroundColor: '#f5f5f5', 
    paddingVertical: 8
  },
  cardContentItem: {
    fontSize: 13, 
    color:'#999', 
    marginRight:8
  },
  cardFooter: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
})