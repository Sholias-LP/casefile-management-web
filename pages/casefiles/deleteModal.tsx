import React, { FC } from "react";
import { Button, Modal, Flex, Paragraph } from "truparse-lodre";

interface IProps {
  isloading: any;
  loading: boolean;
  toggleModal: boolean;
  setToggleModal: Function;
  submit: any;
}

const DeleteModal: FC<IProps> = ({
  isloading,
  loading,
  toggleModal,
  setToggleModal,
  submit,
}) => {
  const handleToggleModal = () => {
    setToggleModal(true);
  };
  return (
    <>
      <Button onClick={handleToggleModal}>Delete</Button>
      <Modal close={(e: boolean) => setToggleModal(e)} trigger={toggleModal}>
        <Flex alignItems="center" justifyContent="center" className="pt-40">
          <Paragraph weight="w600" className="mb-30">
            Are you sure you want to delete this casefile?
          </Paragraph>
        </Flex>
        <Flex alignItems="center" className="pb-40 px-20">
          <Button
            fluid
            onClick={submit}
            loading={loading}
            disabled={loading || isloading}
          >
            Yes, Delete
          </Button>
          <Button variant="outline" onClick={() => setToggleModal(false)} fluid>
            Cancel
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default DeleteModal;
