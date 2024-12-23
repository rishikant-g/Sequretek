import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  usePostCreateUser,
  usePutUpdate,
} from "../../common/services/useUsers";
import { URLS } from "../../common/constants/urls";
import { queryClient } from "../../common/services/queryClient";
import Toast from "../common/Toast";
import { SmallLoader } from "../common/Loader";

interface SingleUser {
  first_name: string;
  job: string;
}

interface UserModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  isEdit?: boolean;
  selectedUser?: SingleUser;
  userId: number;
}

const UserModal: React.FC<UserModalProps> = ({
  show,
  onHide,
  title,
  isEdit = false,
  selectedUser,
  userId,
}) => {
  console.log("selectedUser", selectedUser);
  const [name, setName] = useState<string>(selectedUser?.first_name || "");
  const [job, setJob] = useState<string>(selectedUser?.job || "");
  const { mutate, isSuccess, isPending } = usePostCreateUser(URLS.CREATE_USER);
  const {
    mutate: mutateUpdate,
    isSuccess: isUserUpdate,
    isPending: isUpdatePending,
  } = usePutUpdate(
    selectedUser ? URLS.UPDATE_USER_PUT + `/${userId}` : URLS.CREATE_USER,
  );

  const handleCreateTask = () => {
    if (isEdit) {
      mutateUpdate({
        name: selectedUser?.first_name,
        job: selectedUser?.job,
      });
    } else {
      mutate({ name: selectedUser?.first_name, job: selectedUser?.job });
    }
  };

  useEffect(() => {
    if (isSuccess || isUserUpdate) {
      onHide();
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
      if (isSuccess) {
        Toast("User created successfully!", "success");
      } else {
        Toast("User updated successfully!", "success");
      }
    }
  }, [isSuccess, isUserUpdate]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(isPending || isUpdatePending) && <SmallLoader />}
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setJob(e.target.value)}
              value={job}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateTask}
          disabled={!name || !job || isPending || isUpdatePending}
          type="button"
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
