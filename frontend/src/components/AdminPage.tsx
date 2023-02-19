import React, { useContext, useState } from 'react';
import { MyContext } from '../services/context';
import { ROLES } from '../services/Types';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import UserNotAuthenticated from './UserNotAuthenticated';
import './AdminPage.css';

const Admin: React.FC = () => {
  const useMyContext = useContext(MyContext);
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  if(useMyContext.role !== ROLES.admin){
    return <UserNotAuthenticated/>;
  }

  

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedOption(event.target.value);
  };
  

  const handleButtonClick = (buttonName: string) => {
    console.log(`Clicked button ${buttonName}`);
  };
  const handleFetchDB = () => {
    
  }

  return (
    <div className="my-component-container">
      <Container className="my-component-box">
        <Row >
          <Col>
          <Button variant="primary" onClick={() => handleFetchDB()}>
            Fetch DB
          </Button>{' '}
          <Button variant="primary" onClick={() => handleButtonClick('Button 2')}>
            Delete old notifications
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Players</Form.Label>
            <Form.Control as="select" value={selectedOption} onChange={()=> {}}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
        <Row>
        <Col>
          <Form.Group>
            <Form.Label>Selected player: {selectedOption}</Form.Label>
          </Form.Group>
          </Col>
        </Row>
        
        <Row><Col><hr/></Col></Row>

        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Send notification about selected player"
          aria-label="Send notification about selected player"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Send
        </Button>
      </InputGroup>
      </Container>
    </div>
  );
};

export default Admin;