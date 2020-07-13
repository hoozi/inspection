import * as React from 'react';
import { Text, TextStyle, View } from 'react-native';
import { toFixed2 } from '../../shared/utils';
import btStyles from '../BottomButton/style';

interface IPriceProps {
  total?:string | number;
  style?:TextStyle;
  desc?:string
}

const Price:React.FC<IPriceProps> = ({
  total=0,
  style={},
  desc=''
}:IPriceProps) => (
  <Text style={[btStyles.extraText, style]}>
    <Text style={{fontSize:13}}>¥</Text>
    {toFixed2(total??0)}
  </Text>
)

export default Price