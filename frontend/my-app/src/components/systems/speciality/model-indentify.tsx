import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Iuser } from "../../../constants/interface";
import { CHOSE } from "../../../constants/path";

function Identifier({
  show,
  setShow,
  choseUsers,
  hanldeOnclick,
}: {
  show: boolean;
  setShow: React.SetStateAction<any>;
  hanldeOnclick: (action?: string, id?: number) => void;
  choseUsers?: Iuser<string>;
}) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {`You want to delete email : ${choseUsers?.email}`} */}
          "Do you want to delete this Speciality?"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => hanldeOnclick(CHOSE.delete)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Identifier;
