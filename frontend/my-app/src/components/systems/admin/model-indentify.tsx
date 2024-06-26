import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Iuser } from "../../../constants/interface";
import { CHOSE } from "../../../constants/path";

function Identifier({
  show,
  setShow,
  choseUsers,
  createOrEditOrDeleteUser,
}: {
  show: boolean;
  setShow: React.SetStateAction<any>;
  createOrEditOrDeleteUser: (
    type?: String,
    user?: Iuser<string>,
    index?: number
  ) => void;
  choseUsers?: Iuser<string>;
}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteUser = () => {
    createOrEditOrDeleteUser(CHOSE.DELETE);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`You want to delete email : ${choseUsers?.email}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => createOrEditOrDeleteUser(CHOSE.DELETE, choseUsers)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Identifier;
