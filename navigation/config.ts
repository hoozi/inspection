import { RouteConfig } from '@react-navigation/native';
import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import CheckLogin from '../screen/CheckLogin';
import InspectContainer from '../screen/InspectContainer';
import History from '../screen/History';
import Account from '../screen/Account';
import Login from '../screen/User/Login';
import Logout from '../screen/User/Logout';
import Camera from '../screen/Camera';

export type RootParamList = {
  Main: undefined;
  Login: undefined;
  EditInspectContainer: { type: 'put' };
  Logout: undefined;
  Camera: undefined;
  CheckLogin: undefined;
}

export type TabParamList = {
  InspectContainer: undefined;
  History: undefined;
  Account: undefined;
}

export type ParamList = RootParamList & TabParamList;

export type Config = RouteConfig<ParamList, keyof ParamList, any, StackNavigationOptions, any> & { key: string, isTab?: boolean }

const authorityConfig:Array<Config> = [
  {
    name:'InspectContainer',
    key: 'InspectContainer',
    component: InspectContainer,
    isTab: true,
    options: {
      title: '验箱'
    }
  },
  {
    name: 'History',
    key: 'History',
    component: History,
    isTab: true,
    options: {
      title: '历史'
    }
  },
  {
    name: 'Account',
    key: 'Account',
    component: Account,
    isTab: true,
    options: {
      title: '我的'
    }
  },
  {
    name: 'EditInspectContainer',
    key: 'EditInspectContainer',
    component: InspectContainer,
    initialParams: { type: 'put' },
    isTab: false
  },
  {
    name: 'Camera',
    key: 'Camera',
    component: Camera,
    isTab: false,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Logout',
    key: 'Logout',
    component: Logout,
    isTab: false,
    options: {
      headerShown: false
    }
  }
];

const loginConfig: Config = {
  name: 'Login',
  key: 'Login',
  component: Login,
  options: {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    headerShown: false
  }
}

const checkLoginConfig: Config = {
  name: 'CheckLogin',
  key: 'CheckLogin',
  component: CheckLogin,
  options: {
    headerShown: false
  }
}

export {
  authorityConfig,
  loginConfig,
  checkLoginConfig
}