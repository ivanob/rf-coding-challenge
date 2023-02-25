import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../services/context';
import { ROLES } from '../services/types';
import {fetchFootballPlayers} from '../services/requests'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import UserNotAuthenticated from './UserNotAuthenticated';
import './UserPage.css';

type Player = {
  _id: string,
  name: string,
  number: number,
  nationality: string,
  birthdate: string,
  position: string
}

const emptyPlayer: Player = {
  _id: '',
  name: '',
  number: 0,
  nationality: '',
  birthdate: '',
  position: ''
}

const UserPage: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(emptyPlayer);
  const [players, setPlayers] = useState([emptyPlayer]);
  const [playersSubscribed, setPlayersSubscribed] = useState([]);
  useEffect(() => {
    fetchFootballPlayers(useMyContext.jwt)
      .then(response => 
        {
          const playersFetched = response.data.data
          setPlayers(playersFetched);
        }
      )
      .catch(error => console.error(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useMyContext = useContext(MyContext);

  if(useMyContext.role !== ROLES.user){
    return <UserNotAuthenticated/>;
  }

  const onChangeSelectPlayer = (event: React.ChangeEvent<any>) => {
    console.log(event.target.value);
    const p = players.find(p => p._id === event.target.value);
    console.log(p)
    if(p){
      setSelectedPlayer(p);
    }
  }

  const getPlayerDescription = (player: Player) => {
    return `${player.name} (${player.nationality}) playing as ${player.position} with number ${player.number}`
  }

  const handleSubscribePlayer = () => {

  }

  return (
    <>
    <p className="header">Hello <b>{useMyContext.login}</b>, you are logged in as <b>{useMyContext.role}</b></p>
    <div className="my-component-container">
      <Container className="my-component-box">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>List of players (limited to 50)</Form.Label>
            <Form.Control as="select" onChange={onChangeSelectPlayer}>
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {getPlayerDescription(player)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
        <Row>
        <Col>
          <Form.Group>
            <Form.Label>Selected player: {selectedPlayer.name}</Form.Label>
          </Form.Group>
          </Col>
          <Col><Button id="button-addon2" onClick={handleSubscribePlayer}>
              Suscribe to player news
            </Button></Col>
        </Row>
        
        <Row><Col><hr/></Col></Row>

        <InputGroup className="mb-3">
        <Form.Label>Subscribed players</Form.Label>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>Position</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {playersSubscribed.map((p: Player, index: number) => (
          <tr>
          <td>{index}</td>
          <td>{p.name}</td>
          <td>{p.nationality}</td>
          <td>{p.position}</td>
          <td>Remove</td>
        </tr>
        ))}
        
        </tbody></Table>
      </InputGroup>
      </Container>
    </div>
    </>
  );
};

export default UserPage;