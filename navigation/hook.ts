import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { getToken } from '../shared/token';

export default function useCheckToken(...dependencies:any[]):Array<any> {
  const [appToken, forceNavigationUpdate] = React.useState<string | null>(`${Date.now()}`);
  const { common,user } = useDispatch<RematchDispatch<Models>>();
  const checkTokenCallBack = React.useCallback(() => {
    async function checkToken(){
      try {
        const tokenFromStorage = await getToken();
        if(tokenFromStorage) {
          common.fetchDirByType('CTN_OWNER');
          common.fetchDirForCtnSizeType();
          user.fetchCurrentUser();
        }
        if(appToken !== tokenFromStorage) {
          forceNavigationUpdate(tokenFromStorage);
        }
      } catch(e) {}
    }
    checkToken();
  }, [getToken, forceNavigationUpdate, ...dependencies]);
  checkTokenCallBack();
  return [appToken, forceNavigationUpdate]
}