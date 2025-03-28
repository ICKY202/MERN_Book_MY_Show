import { useSelector } from "react-redux";
import { Form, Row, Col, Modal, message, Button, Input } from "antd";
import TextArea  from 'antd/es/input/TextArea';
import { addTheater, updateTheater } from "../../apis/theater";

export default function TheaterFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedTheater,
  setSelectedTheater,
  getTheaters,
}) {
  const { user } = useSelector((state) => state.user);
  
  const onFinish = async(values) => {

    try {
        let resp = null;
        if(formType === 'add') {
            values.owner = user?._id
            resp = await addTheater(values);
        }else {
            resp = await updateTheater({...values, _id: selectedTheater._id});
        }
        if(resp.success) {
            getTheaters();
            setIsModalOpen(false);
            message.success(resp.message);
        }else {
            setIsModalOpen(false);
            message.error(resp.messsage);
        }
    }catch(err) {
        message.error(err.message);
    }

  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheater(null);

  }
  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form layout="vertical"  style={{ width: "100%" }} initialValues={selectedTheater} onFinish={onFinish}>
      <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter the theatre name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Theatre Address"
              htmlFor="address"
              name="address"
              className="d-block"
              rules={[{ required: true, message: "Theatre addresss is required!" }]}
            >
              <TextArea
                id="address"
                rows="3"
                placeholder="Enter the theatre name"
              ></TextArea>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label="Email"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[{ required: true, message: "Email  is required!" }]}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter the email"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  htmlFor="phone"
                  name="phone"
                  className="d-block"
                  rules={[
                    { required: true, message: "Phone number is required!" },
                  ]}
                >
                  <Input
                    id="phone"
                    type="number"
                    placeholder="Enter the phone number"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
