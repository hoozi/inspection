import * as React from 'react';
import { Text, TextStyle, View } from 'react-native';
import { toFixed2 } from '../../shared/utils';
import btStyles from '../BottomButton/style';

interface PriceProps {
  total?:string | number;
  style?:TextStyle;
  desc?:string
}

const Price:React.FC<PriceProps> = ({
  total=0,
  style={},
  desc=''
}:PriceProps) => (
  <Text style={[btStyles.extraText, style]}>
    <Text style={{fontSize:13}}>¥</Text>
    {toFixed2(total??0)}
  </Text>
)

export default Price