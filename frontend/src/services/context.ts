import { createContext } from 'react';

interface MyContextData {
  id: string,
  jwt: string;
  login: string;
  role: string;
  subscribedPlayers: string[]
}

export const MyContext = createContext<MyContextData>({
  id: '',
  jwt: '',
  login: '',
  role: '',
  subscribedPlayers: []
});