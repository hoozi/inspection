import * as React from 'react';
import { 
  View, 
  SafeAreaView, 
  Text,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RematchDispatch, Models } from '@rematch/core';
import { ScreenNavigationProp } from '../../interface';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';
import Price from '../../components/Price';
import CaiNiao from '../../icon/CaiNiao';
import { color } from '../../constants';
import { RootState } from '../../store';
import styles from './style';

interface IHistoryCardProps {
  data?:any;
  onCardPress(id:number):void
}

const HistoryCard:React.FC<IHistoryCardProps> = ({
  data,
  onCardPress
}) => {
  return (
    <TouchableHighlight onPress={() => onCardPress(data.id)} underlayColor='#f9f9f9' style={styles.cardContainer}>
      <>
        <View style={styles.cardHeader}>
          <Text style={{fontSize: 14, alignItems: 'center', color: color.brandColor}}>
            <CaiNiao name='xinxi-yuankuang' size={14} color={color.brandColor}/> {data.ctnNo} 
            {
              data.eir && 
              <Text> / {data.eir}</Text> 
            }
          </Text>
          <CaiNiao name='xiayiyeqianjinchakangengduo' size={16} color='#999'/> 
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentItem}>箱主 <Text style={{color:color.textBaseColor}}>{data.ctnOwner}</Text></Text>
          <Text style={styles.cardContentItem}>箱型尺寸 <Text style={{color:color.textBaseColor}}>{data.ctnSizeType}</Text></Text>
          <Text style={styles.cardContentItem}>车牌 <Text style={{color:color.textBaseColor}}>{data.numberPlate}</Text></Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={{color:color.textBaseColor}}>
            {data.applyTime}
          </Text>
          <Price total={data.repairFee} style={{paddingLeft: 4}}/>
        </View>
      </>
    </TouchableHighlight>
  )
}

export default ():React.ReactElement => {
  const { history, inspection } = useDispatch<RematchDispatch<Models>>();
  const { navigate } = useNavigation<ScreenNavigationProp<'History'>>();
  const [ refreshing, setRefreshing ] = React.useState<boolean>(false);
  const { data } = useSelector((state:RootState) => state.history);
  const loading = useSelector((state:RootState) => state.loading);
  const fetchHistorying:boolean = loading.effects.history.fetchHistory;
  useFocusEffect(
    React.useCallback(() => {
      history.fetchHistory()
    }, [])
  );
  const handleCardPress = React.useCallback((id:number) => {
    inspection.reset();
    function getCurrentRow() {
      const currentRow = data.filter((item:any) => item.ctnApply.id === id)[0];
      const newCtnRepairParamsList = [...currentRow.ctnRepairParamsList]
      currentRow.ctnRepairParamsList = newCtnRepairParamsList.map(item => ({
        ...item,
        _photos: [...item.photos]
      }));
      inspection.save(currentRow);
      if(currentRow.ctnApply.ctnOwner) {
        inspection.fetchRateByCtnOwner(currentRow.ctnApply.ctnOwner)
      }    
    }
    setTimeout(getCurrentRow, 0)
    navigate('EditInspectContainer', {
      type: 'put'
    });
    
  },[navigate, inspection, data]);

  const handleHistoryRefresh = React.useCallback(() => {
    setRefreshing(true);
    history.fetchHistory({
      callback() {
        setRefreshing(false);
      }
    })
  }, [setRefreshing])

  return (
    <SafeAreaView style={{flex: 1}}>
      <WhenFocusStatusBar barStyle='light-content' backgroundColor={color.brandColor}/>
      {
        fetchHistorying && !refreshing ? 
        <Loading text='加载中...' color={color.brandColor}/> :
          data.length ?
          <FlatList
            keyExtractor={item => item.ctnApply.id+''}
            style={{flex: 1}}
            data={data}
            refreshing={refreshing}
            onRefresh={handleHistoryRefresh}
            renderItem={({item}) => (
              <HistoryCard data={item.ctnApply} onCardPress={handleCardPress}/>
            )}
            contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 12}}
          /> : 
          <Empty retryText='点击重试' onTextPress={() => history.fetchHistory()}/>
      }
    </SafeAreaView>
  )
}