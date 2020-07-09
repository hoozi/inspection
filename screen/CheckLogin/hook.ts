import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AppContext, AppContextProps } from '../../navigation';
import { getToken } from '../../shared/token';

export default function useCheckToken(...dependencies:any[]):Array<(() => void)> {
  const { common,user } = useDispatch<RematchDispatch<Models>>();
  const { forceNavigationUpdate } = React.useContext<AppContextProps>(AppContext);
  const checkTokenCallback = React.useCallback(() => {
    async function checkToken(){
      try {
        const tokenFromStorage = await getToken();
        if(tokenFromStorage) {
          common.fetchDirByType('CTN_OWNER');
          common.fetchDirForCtnSizeType();
          user.fetchCurrentUser();
        }
        forceNavigationUpdate(tokenFromStorage)
      } catch(e) {}
    }
    checkToken();
  }, [getToken, forceNavigationUpdate, ...dependencies]);
  return [checkTokenCallback]
}