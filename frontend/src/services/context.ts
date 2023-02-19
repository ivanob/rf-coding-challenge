import { createContext } from 'react';

interface MyContextData {
  jwt: string;
  login: string;
  role: string;
}

export const MyContext = createContext<MyContextData>({
  jwt: '',
  login: '',
  role: ''
});