  
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { border } from '../../../../style';
import { color } from '../../../../constants';

interface IExaminationFormStyle {
  container: ViewStyle;
  item: ViewStyle;
  extra: ViewStyle;
  extraText: TextStyle;
  breakageList: ViewStyle;
  addButton: ViewStyle;
  addButtonText: TextStyle;
  breakageCard: ViewStyle;
  breakageCardHeader: ViewStyle;
  breakageCardTitle: TextStyle;
  breakageCardBody: ViewStyle;
  breakageCardDelete: TextStyle;
  breakageAddImage: ViewStyle;
  breakageImage: ImageStyle;
  breakageImageContainer: ViewStyle;
  breakageCardFooter: ViewStyle;
  breakageRemark: TextStyle;
  deleteImage: ViewStyle;
  maskUploading: ViewStyle;
  maskUploadingText: TextStyle;
  name: TextStyle;
}

const imageStyle:ImageStyle = {
  borderRadius:4,
  width: 62,
  height: 62
}

export default StyleSheet.create<IExaminationFormStyle>({
  container: {
    flex:1
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  extra: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  extraText: {
    color: '#999'
  },
  name: {
    fontSize: 14, 
    color: color.textBaseColor
  },
  breakageList: {
    flex: 1,
    paddingBottom: 40,
  },
  addButton: {
    marginTop: 12,
    marginHorizontal: 12,
    height:42,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius:4,
    ...border(`${StyleSheet.hairlineWidth}`),
    alignItems: 'center'
  },
  addButtonText: {
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 4,
    color: color.warningColor
  },
  breakageCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: color.borderColorBase,
    borderWidth: StyleSheet.hairlineWidth
  },
  breakageCardHeader: {
    paddingHorizontal:12,
    paddingRight: 0,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.borderColorBase,
    backgroundColor: '#f9f9f9'
  },
  breakageCardTitle: {
    fontSize: 14,
    color: color.textBaseColor
  },
  breakageCardDelete: {
    height: 36, 
    width: 36, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ff5b05'
  },
  breakageCardBody: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  breakageAddImage: {
    ...imageStyle,
    justifyContent: 'center',
    alignItems: 'center',
    ...border(StyleSheet.hairlineWidth)
  },
  breakageImageContainer: {
    ...imageStyle,
    marginRight: 12,
    
  },
  breakageImage: {
    ...imageStyle
  },
  deleteImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#ff5b05',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8
  },
  breakageCardFooter: {
    ...border(`${StyleSheet.hairlineWidth} 0 0 0`),
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  breakageRemark: {
    flex:1,
    height: 24,
    padding: 0,
    marginLeft: 8
  },
  maskUploading: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  maskUploadingText: {
    fontSize:12, 
    color:'#fff', 
    marginTop:4
  }
})