/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {
  Provider as AntdProvider
} from '@ant-design/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import AppNavigation from './navigation';
import store from './store';
import { theme } from './constants';

const App:React.FC<any> = () => {
  return (
    <ReduxProvider store={store}>
      <AntdProvider theme={theme}>
        <AppNavigation/>
      </AntdProvider>
    </ReduxProvider>
  );
};

export default App;
