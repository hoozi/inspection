import * as React from 'react';
import { StatusBar,StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { color } from '../../constants';
 
export default function WhenFocusStatusBar(props:StatusBarProps):React.ReactElement | null {
  const { backgroundColor=color.brandColor, barStyle='light-content', ...restProps} = props;
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar backgroundColor={backgroundColor} barStyle={barStyle}  {...restProps} /> : null;
}