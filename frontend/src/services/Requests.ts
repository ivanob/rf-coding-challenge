import axios, { AxiosResponse } from 'axios';
import { User } from './Types';

export async function sendRequestCreateUser(user: User): Promise<AxiosResponse<any>> {
  try {
    const response: AxiosResponse = await axios.post('http://localhost:3030/users/', { "login": user.login, "password": user.password, "role": user.role}, 
    {
        headers: {'Content-Type': 'application/json',}
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function authenticateUser(user: User): Promise<AxiosResponse<any>> {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:3030/authentication/', { "strategy": "local", "login": user.login, "password": user.password},
    {
        headers: {'Content-Type': 'application/json',}
    });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

export async function fetchFootballPlayers(jwt: string): Promise<AxiosResponse<any>> {
  try {
    const response: AxiosResponse = await axios.put('http://localhost:3030/players/', 
    {
      'fetch-data': true
    },
    {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`}
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}