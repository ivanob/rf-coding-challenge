import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../services/context";
import { ROLES } from "../services/types";
import { fetchFootballPlayers, sendNewNotification, sendOrderCleanOldNotifications } from "../services/requests";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import UserNotAuthenticated from "./UserNotAuthenticated";
import "./styles/AdminPage.css";

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

const Admin: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(emptyPlayer);
  const [players, setPlayers] = useState([emptyPlayer]);
  useEffect(() => {
    fetchFootballPlayers(useMyContext.jwt)
      .then((response) => {
        const playersFetched = response.data.data;
        setPlayers(playersFetched);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useMyContext = useContext(MyContext);

  if (useMyContext.role !== ROLES.admin) {
    return <UserNotAuthenticated />;
  }
  const internalState = {
    msg: "",
  };

  const onChangeSelectPlayer = (event: React.ChangeEvent<any>) => {
    console.log(event.target.value);
    const p = players.find((p) => p._id === event.target.value);
    console.log(p);
    if (p) {
      setSelectedPlayer(p);
    }
  };

  const getPlayerDescription = (player: Player) => {
    return `${player.name} (${player.nationality}) playing as ${player.position} with number ${player.number}`;
  };

  const handleDeleteOldNotification = () => {
    sendOrderCleanOldNotifications(useMyContext.jwt);
  };
  const handleFetchDB = async () => {
    const playersFetched = await (
      await fetchFootballPlayers(useMyContext.jwt)
    ).data.data;
    setPlayers(playersFetched);
    setSelectedPlayer(playersFetched[0]);
  };

  const handleSendNotification = (event: any) => {
    console.log(internalState.msg);
    useMyContext.wsConn.emit(
      "send-notification",
      selectedPlayer._id,
      internalState.msg
    );
    sendNewNotification(useMyContext.jwt, selectedPlayer._id, internalState.msg);
  };

  return (
    <>
      <p className="header">
        Hello <b>{useMyContext.login}</b>, you are logged in as{" "}
        <b>{useMyContext.role}</b>
      </p>
      <div className="my-component-container">
        <Container className="my-component-box">
          <Row>
            <Col>
              <Button variant="primary" onClick={() => handleFetchDB()}>
                Fetch DB
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => handleDeleteOldNotification()}
              >
                Delete old notifications
              </Button>
            </Col>
          </Row>
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
                <Form.Label>Selected player: <b>{selectedPlayer.name}</b></Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Send notification about selected player"
              aria-label="Send notification about selected player"
              aria-describedby="basic-addon2"
              onChange={(e) => (internalState.msg = e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSendNotification}
            >
              Send
            </Button>
          </InputGroup>
        </Container>
      </div>
    </>
  );
};

export default Admin;
