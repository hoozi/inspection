import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

export const getScreenTitle = (route:Route<string>):string => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'InspectContainer';
  switch (routeName) {
    case 'InspectContainer':
      return '验箱';
    case 'History':
      return '历史';
    case 'Account':
      return '我的';
  }
  return '';
}

export const getHeaderShown = (route:Route<string>):boolean => {
  return getFocusedRouteNameFromRoute(route) !== 'Account'
}
