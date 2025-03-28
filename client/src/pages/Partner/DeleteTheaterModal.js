import { Modal, message } from "antd";
import { deleteTheater } from "../../apis/theater";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getTheaters,
}) => {
  const handleOk = async () => {
    try {
      
      const theatreId = selectedTheatre._id;
      const response = await deleteTheater({ _id:theatreId });
      
      if (response.success) {
        message.success(response.message);
        getTheaters();
      } else {
        message.error(response.message);
        setSelectedTheatre(null);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <>
      <Modal
        title="Delete Theatre?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theatre?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theatre data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteTheatreModal;