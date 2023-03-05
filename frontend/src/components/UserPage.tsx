import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../services/context";
import { ROLES } from "../services/types";
import {
  setSubscriptionsToUser,
  fetchFootballPlayers,
} from "../services/requests";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import UserNotAuthenticated from "./UserNotAuthenticated";
import "./styles/UserPage.css";
import { ToastContainer, toast } from "react-toastify";

type Player = {
  _id: string;
  name: string;
  number: number;
  nationality: string;
  birthdate: string;
  position: string;
};

const emptyPlayer: Player = {
  _id: "",
  name: "",
  number: 0,
  nationality: "",
  birthdate: "",
  position: "",
};

const callbackDisplayWSMsg = (str: string) => {
  console.log(str);
};

const UserPage: React.FC = () => {
  const useMyContext = useContext(MyContext);
  const [selectedPlayer, setSelectedPlayer] = useState(emptyPlayer);
  const [players, setPlayers] = useState([emptyPlayer]);
  const [playersSubscribed, setPlayersSubscribed] = useState<{subs: Player[]}>({subs: []});
  useEffect(() => {
    fetchFootballPlayers(useMyContext.jwt)
      .then((response) => {
        const playersFetched = response.data.data;
        setPlayers(playersFetched);
        setPlayersSubscribed({subs: []})
        const playersToSubs: Player[] = useMyContext.subscribedPlayers.map((idPlayer: string) => {
          const playerToSubscribe = playersFetched.find((p: Player) => p._id === idPlayer);
          useMyContext.wsConn.emit("subscribe", playerToSubscribe._id, callbackDisplayWSMsg);
          return playerToSubscribe
        });
        setPlayersSubscribed({subs: playersToSubs})
        
        // Setup the websocket
        useMyContext.wsConn.on(
          "received-notification",
          (playerId: string, message: string) => {
            console.log(
              `Received notification about playerId=${playerId}, message=${message}`
            );
            const playerName = playersFetched.find(
              (p: { _id: string; }) => p._id === playerId
            )?.name;
            if (playerName) {
              toast(
                `[${new Date().toDateString()}] News from ${playerName}: ${message}`
              );
            }
          }
        );
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (useMyContext.role !== ROLES.user) {
    return <UserNotAuthenticated />;
  }

  const onChangeSelectPlayer = (event: React.ChangeEvent<any>) => {
    const p = players.find((p) => p._id === event.target.value);
    if (p) {
      setSelectedPlayer(p);
    }
  };

  const getPlayerDescription = (player: Player) => {
    return `${player.name} (${player.nationality}) playing as ${player.position} with number ${player.number}`;
  };

  const handleSubscribePlayer = () => {
    if(!playersSubscribed.subs.find(p=>p._id === selectedPlayer._id)){
      useMyContext.wsConn.emit("subscribe", selectedPlayer._id, callbackDisplayWSMsg);
      const copyPlayersSubscribed = [...playersSubscribed.subs, selectedPlayer]
      setPlayersSubscribed({subs: copyPlayersSubscribed})
      setSubscriptionsToUser(
        useMyContext.jwt,
        copyPlayersSubscribed.map((p) => p._id)
      );
    }
  };

  const handleRemoveSubscription = (idPlayerToRemove: string) => {
    const playerToRemove = playersSubscribed.subs.find(p => p._id === idPlayerToRemove)
    if(playerToRemove){
      const copyPlayersSubscribed = [...playersSubscribed.subs.filter(p => p._id !== playerToRemove._id)]
      setPlayersSubscribed({subs: copyPlayersSubscribed})
      useMyContext.wsConn.emit("unsubscribe", playerToRemove._id, callbackDisplayWSMsg);
      setSubscriptionsToUser(
        useMyContext.jwt,
        copyPlayersSubscribed.map((p) => p._id)
      );
    }
  };

  return (
    <>
      <p className="header">
        Hello <b>{useMyContext.login}</b>, you are logged in as{" "}
        <b>{useMyContext.role}</b>
      </p>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
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
                <Form.Label>
                  Selected player: <b>{selectedPlayer.name}</b>
                </Form.Label>
              </Form.Group>
            </Col>
            <Col>
              <Button id="button-addon2" onClick={handleSubscribePlayer}>
                Suscribe to player news
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

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
                {playersSubscribed.subs.map((p: Player, index: number) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{p.name}</td>
                    <td>{p.nationality}</td>
                    <td>{p.position}</td>
                    <td>
                      <Button
                        id="button-addon2"
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveSubscription(p._id)}
                      >
                        Unsubscribe
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InputGroup>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
