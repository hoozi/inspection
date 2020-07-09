import * as React from 'react';
import { StatusBar, Platform } from 'react-native';
import { 
  NavigationContainer, 
  DefaultNavigatorOptions, 
  NavigationContainerRef,
  NavigationAction,
  NavigationState
} from '@react-navigation/native';
import { 
  createStackNavigator, 
  StackNavigationOptions,
  CardStyleInterpolators,
  HeaderStyleInterpolators 
} from '@react-navigation/stack';
import { createBottomTabNavigator,BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationConfig } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import CaiNiao from '../icon/CaiNiao';
import { ParamList, Config, authorityConfig, loginConfig } from './config';
import { color } from '../constants';
import { getScreenTitle, getHeaderShown } from './utils';
import useCheckToken from './hook';

type NavigatorProp<T> = Omit<Omit<DefaultNavigatorOptions<T>, 'children'>, 'initialRouteName'>;
type TabNavigatorProp = NavigatorProp<BottomTabNavigationOptions> & BottomTabNavigationConfig;

const Stack = createStackNavigator<ParamList>();
const Tab = createBottomTabNavigator<ParamList>();

const Main:React.FC<any> = () => (
  <Tab.Navigator {...defaultTabProps}>
    {
      authorityConfig
        .filter(cfg => cfg.isTab)
        .map(cfg => <Tab.Screen {...cfg}/>)
    }
  </Tab.Navigator>
)

export interface AppContextProps {
  forceNavigationUpdate: React.Dispatch<string | null>
}

export const AppContext = React.createContext<AppContextProps>({
  forceNavigationUpdate: () => {}
});

const AppNavigation:React.FC<any> = () => {
  const [appToken, forceNavigationUpdate] = useCheckToken();
  return (
    <AppContext.Provider value={{forceNavigationUpdate}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator {...defaultStackProps}>
          {
            appToken ? 
            <>
              <Stack.Screen {...authorityContainerConfig}/>
              {
                authorityConfig
                  .filter(cfg => !cfg.isTab)
                  .map(cfg => <Stack.Screen {...cfg}/>)
              }
            </> :
            <Stack.Screen {...loginConfig}/>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}

const navigationRef:React.RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name:string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
export function goBack() {
  navigationRef.current?.goBack();
}
export function navigationDispatch(action:NavigationAction | ((state: NavigationState) => NavigationAction)) {
  return navigationRef.current?.dispatch(action)
}

const authorityContainerConfig:Config = {
  name: 'Main',
  key: 'Main',
  component: Main,
  options({route}) {
    return {
      headerTitle: getScreenTitle(route),
      headerShown: getHeaderShown(route),
      headerStatusBarHeight: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
    }
  }
};
const defaultStackProps:NavigatorProp<StackNavigationOptions> = {
  screenOptions: {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
    headerStyle: {
      backgroundColor: color.brandColor,
      height: 44
    },
    headerTintColor: color.tintColor,
    headerTitleAlign: 'center'
  }
};

const iconNameMap:{[key: string]: Array<string>} = {
  'InspectContainer': ['jiankongshexiangtou-xianxing', 'jiankongshexiangtou'],
  'History': ['danju-xianxing', 'danju'],
  'Account': ['yonghu-xianxing', 'yonghu']
}

const defaultTabProps:TabNavigatorProp = {
  tabBarOptions: {
    style: {
      elevation:0,
      borderTopColor:color.borderColorBase,
      paddingBottom:2
    },  
    labelStyle: {
      marginTop:-4
    },
    activeTintColor: color.brandColor,
    inactiveTintColor: '#cecece',
    safeAreaInsets: Platform.OS === 'android' ? {
      bottom: 0
    } : {}
  },
  screenOptions({ 
    route
  }:any) {
    return {
      tabBarIcon({ focused, color, size }:any) {
        return <CaiNiao name={iconNameMap[route.name][Number(focused)]} color={color} size={size}/>
      }
    }
  }
};

export default AppNavigation;