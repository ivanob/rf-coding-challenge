import React, { useContext } from 'react';
import { MyContext } from '../services/context';
import { ROLES } from '../services/Types';
import UserNotAuthenticated from './UserNotAuthenticated';

const useMyContext = () => useContext(MyContext);

const Admin: React.FC = () => {
  if(useMyContext().role !== ROLES.admin){
    return <UserNotAuthenticated/>;
  }
  return (
    <div>
      <h1>Admin page</h1>
    </div>
  );
};

export default Admin;