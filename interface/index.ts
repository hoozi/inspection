import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamList } from '../navigation/config';

export interface Api {
  [key: string]: <T>(params?:any,extra?:any) => Promise<T>
}

export type ScreenNavigationProp<T extends keyof ParamList> = StackNavigationProp<ParamList, T>;
export type ScreenRouteProp<T extends keyof ParamList> = RouteProp<ParamList, T>;
