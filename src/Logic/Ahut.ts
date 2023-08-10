import React from 'react';
import {Dispatch, SetStateAction} from 'react';

export function getToken(): string | null {
  if (localStorage.getItem('Token') === null) {
    return null;
  }
  return localStorage.getItem('Token');
}

export function localStorageCheckAhut(): boolean {
  return localStorage.getItem('Token') !== null;
}

 type LoginProvider = {
  usLogin: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
};
export const LoginInC = React.createContext<LoginProvider>({
  usLogin: localStorageCheckAhut(),
  setLogin: () => {},
});
