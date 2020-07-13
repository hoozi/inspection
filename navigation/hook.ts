import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { getToken } from '../shared/token';

export default function useCheckToken(...dependencies:any[]):Array<any> {
  const [appToken, forceNavigationUpdate] = React.useState<string | null>(`${Date.now()}`);
  const { user } = useDispatch<RematchDispatch<Models>>();
  React.useEffect(() => {
    async function checkToken(){
      try {
        const tokenFromStorage = await getToken();
        if(tokenFromStorage) {
          user.fetchCurrentUser();
        }
        forceNavigationUpdate(tokenFromStorage);
      } catch(e) {}
    }
    checkToken();
  }, [getToken, appToken, forceNavigationUpdate, ...dependencies]);
  return [appToken, forceNavigationUpdate]
}