import React, { useContext, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { authenticateUser, sendRequestCreateUser as registerNewUser } from '../services/requests';
import ModalUserType from './ModalUserType';
import { MyContext } from '../services/context';
import { useNavigate } from 'react-router-dom';

function App() {
  const useMyContext = useContext(MyContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameCreated, setUsernameCreated] = useState('');

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [role, setRole] = useState('admin');
  
  // Funtion to handle when the user tries to login
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const userAuthenticated = await authenticateUser({
      login: username,
      password,
      role
    });
    console.log(userAuthenticated.data.accessToken, userAuthenticated.data.user.login, userAuthenticated.data.user.role)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMyContext.jwt = userAuthenticated.data.accessToken;
    useMyContext.login = userAuthenticated.data.user.login;
    useMyContext.role = userAuthenticated.data.user.role;
    navigate("/admin");
  };

  // This function will trigger a modal to ask the role of the new user
  const createUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShow(true);
  };

  // Function to send a request to create a new user given they: login, password and role
  const userCreated = async () => {
    registerNewUser({
      login: username,
      password,
      role
    })
    setShow(false);
    setShowAlert(true);
    setUsernameCreated(username);
    setUsername('');
    setPassword('');
  };

  return (
    <>
    <ModalUserType active={show} closeModal={()=>setShow(false)} setRole={setRole} acceptModal={()=>userCreated}/>
    <Alert key='info' variant='info' show={showAlert}>
          User {usernameCreated} created
    </Alert>
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'grey', margin: '0px' }}>
      <Form onSubmit={handleSubmit} className="p-5 bg-light rounded">
        <h2 className="text-center mb-4">Login</h2>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={createUser} className="w-100 mt-4">
          Create User
        </Button>
        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>
      </Form>
    </Container>
    </>
  );
}

export default App;
