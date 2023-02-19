import { createContext } from 'react';

interface MyContextData {
  jwt: string;
  login: string;
  role: string;
  updateData: (jwt: string, login: string, role: number) => void;
}

export const MyContext = createContext<MyContextData>({
  jwt: '',
  login: '',
  role: '',
  updateData: () => {},
});