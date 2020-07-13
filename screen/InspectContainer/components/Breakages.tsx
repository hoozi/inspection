import * as React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ImageURISource,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { Picker, ActivityIndicator } from '@ant-design/react-native';
import { ScreenNavigationProp,ScreenRouteProp } from '../../../interface';
import { AppContext, AppContextProps } from '../../../navigation';
import Price from '../../../components/Price';
import CaiNiao from '../../../icon/CaiNiao';
import { color } from '../../../constants';
import { RootState } from '../../../store';
import { Breakage } from '../../../store/models/inspection';
import { SERVICE_URL } from '../../../constants';
import ImageGrid from './ImageGrid';
import styles from './style';

interface BreakageCardProps {
  onDeleteBreakage(id?:number):void;
  onChangeBreakage(value:any, id?:number):void;
  data:Breakage;
  rateData: Array<any>;
  photoTotal?: number;
}

const BreakageCard:React.FC<BreakageCardProps> = ({
  onDeleteBreakage,
  onChangeBreakage,
  data,
  rateData,
  photoTotal=3
}) => {
  const { uploadings } = useSelector((state:RootState) => state.common);
  const { appToken } = React.useContext<AppContextProps>(AppContext);
  const { navigate } = useNavigation<ScreenNavigationProp<'Camera'>>();
  const photos:Array<string> = data._photos;
  const photosLength:number = photos.length;
  return (
    <View style={styles.breakageCard}>
      <View style={styles.breakageCardHeader}>
        <Picker
          itemStyle={{
            paddingVertical: 6
          }}
          data={rateData}
          value={
            [
              data.componentCname??'',
              data.repairName??'',
              `${data.length}x${data.width}`??''
            ]
          }
          cols={3}
          onChange={v => onChangeBreakage(v, data.id)}
          cascade
        >
          <TouchableOpacity>
            <View style={{flexDirection: 'row', height: '100%', alignItems:'center'}}>
              <Text style={styles.breakageCardTitle}>{`${data.componentCname || '部位'}/${data.repairName || '维修方式'}/${data.length}x${data.width}cm`}</Text>
              <CaiNiao name='xiayiyeqianjinchakangengduo' size={16} color='#999'/>
            </View>
          </TouchableOpacity>
        </Picker>
        <TouchableHighlight 
          underlayColor='#e85405'
          onPress={() => onDeleteBreakage(data.id)} 
          style={styles.breakageCardDelete}
        >
          <CaiNiao name='cuowuguanbiquxiao' color='#fff' size={24} />
        </TouchableHighlight>
      </View>
      <View style={styles.breakageCardBody}>
        <View style={{flexDirection: 'row'}}>
          {
            photos.map(uri => {
              const source:Source = 
              uri.indexOf('file://') > -1 ? 
              { uri } : 
              {
                uri: `${SERVICE_URL}/yms/ctn-repair/getFile/${uri}`,
                headers: {
                  Authorization: `Bearer ${appToken}`
                }
              }
              return (
                <ImageGrid 
                  key={uri} 
                  source={source} 
                  parentId={data.id} 
                  uploading={uploadings[uri]}
                  onLoadStart={() => console.log('start--->',uri)}
                  onLoadEnd={() => console.log('end--->', uri)}
                />
              )
            })
          }
          {
            photosLength < photoTotal &&
            <TouchableHighlight style={styles.breakageAddImage} underlayColor='#f5f5f5' onPress={() => navigate('Camera', { breakageId: data.id })}>
              <>
                <CaiNiao name='paizhao-xianxing' size={36} color='#e6e6e6'/>
                <Text style={{fontSize: 12, color: '#dedede'}}>{photosLength}/{photoTotal}</Text>
              </>
            </TouchableHighlight>
          }
        </View>
        <Price total={data.customerRate} style={{color:color.textBaseColor}}/>
      </View>
    </View>
  )
}

const repairComponentParams:Array<string> = [
  'componentCname',
  'repairName',
  'length',
  'width'
]

export default ():React.ReactElement => {
  const { inspection } = useDispatch<RematchDispatch<Models>>();
  const { ctnRepairParamsList, treeRate, rate }= useSelector((state:RootState) => state.inspection);
  const loading = useSelector((state:RootState) => state.loading);
  const fetchRateByCtnOwnering = loading.effects.inspection.fetchRateByCtnOwner;
  const handleAddBreakage = React.useCallback(() => {
    const id = ctnRepairParamsList.length+1;
    const breakage:Breakage = {
      id,
      componentCname: '',
      repairName: '',
      length: 0,
      width: 0,
      customerRate: 0,
      raTiCustomerRate: 0,
      photos: [],
      _photos: []
    }
    inspection.updateBreakages({
      breakage
    })
  }, [ctnRepairParamsList, inspection])
  const handleDeleteBreakage = React.useCallback((id:number) => {
    inspection.updateBreakages({
      id,
      type: 'delete'
    });
    inspection.computedFee();
  }, [inspection]);
  const handleChangeBreakage = React.useCallback((values, id:number) => {
    const oldBreakage = ctnRepairParamsList.filter(item => item.id === id)[0];
    const changedBreakageFields:Partial<Breakage> = {};
    const size:string[] = values[2].split('x');
    values.splice(2,1,...size);
    const currentRate:Breakage = rate.filter((item:Breakage) => 
      item.componentCname === values[0] &&
      item.repairName === values[1] &&
      item.length === Number(values[2]) &&
      item.width === Number(values[3])
    )[0]??{};
    repairComponentParams.forEach((name, index) => {
      changedBreakageFields[name] = values[index]
    });
    changedBreakageFields['customerRate'] = currentRate['customerRate'];
    changedBreakageFields['raTiCustomerRate'] = currentRate['raTiCustomerRate'];
    inspection.updateBreakages({
      breakage: {
        ...oldBreakage,
        ...changedBreakageFields
      },
      id,
      type: 'update'
    });
    inspection.computedFee();
  }, [ctnRepairParamsList, rate, inspection])
  return (
    <>
      <TouchableHighlight 
        style={styles.addButton} 
        underlayColor='#f9f9f9' 
        onPress={handleAddBreakage}
      >
        {
          fetchRateByCtnOwnering ?
          <ActivityIndicator size='small' color={color.brandColor} text='费率获取中...'/> : 
          <View style={{flexDirection:'row', alignItems: 'center'}}>
            <CaiNiao name='jia' color={color.warningColor} size={18}/>
            <Text style={styles.addButtonText}>添加残损信息({ctnRepairParamsList.length})</Text>
          </View>
        }
      </TouchableHighlight>
      {
        ctnRepairParamsList.map(breakage => {
          return (
            <BreakageCard 
              key={breakage.id} 
              rateData={treeRate} 
              data={breakage} 
              onDeleteBreakage={handleDeleteBreakage}
              onChangeBreakage={handleChangeBreakage}
            />
          )
        })
      }
    </>
  )
}