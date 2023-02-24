
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ROLES } from '../services/types';

function ModalUserType(props: { active: boolean | undefined; closeModal: any; setRole: any; acceptModal: any }) {
   
  props.setRole(ROLES.admin);
  return (
    <>
      <Modal show={props.active} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose the role for the user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Select aria-label="Select role" onChange={val => props.setRole(val.target.value)}>
            <option value={ROLES.admin}>Admin</option>
            <option value={ROLES.user}>User</option>
            </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.acceptModal()}>
            Create user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUserType;