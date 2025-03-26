import { useState, useEffect } from "react";
import { message, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchTheatersByOwner } from "../../apis/theater";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import TheaterFormModal from "./TheaterFormModal";
import DeleteTheatreModal from "./DeleteTheaterModal";

export default function TheaterList() {
  const [theaters, setTheaters] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState();
  const [formType, setFormType] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getTheaters = async () => {
    try {
      dispatch(showLoading);
      const resp = await fetchTheatersByOwner({ownerId: user._id});
      console.log(resp);
      if (resp.success) {
        const allTheaters = resp.data;
        setTheaters(
          allTheaters.map((theater) => {
            return { ...theater, key: `theater${theater._id}` };
          })
        );
      } else {
        message.error(resp.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading);
      message.error(err.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return `Approved`;
        } else {
          return `Pending/ Blocked`;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheater(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button onClick={ () => { setIsDeleteModalOpen(true); setSelectedTheater(data); }}><DeleteOutlined/></Button>
            {/* { data.isActive && <Button onClick={ () => { setIsShowModalOpen(true); setSelectedTheatre(data); }}>+ Shows</Button> } */}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getTheaters();
    return () => {console.log("unmounting")};
  }, []);
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theater
        </Button>
      </div>
      <Table dataSource={theaters} columns={columns} />
      {isModalOpen && (
        <TheaterFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheater={selectedTheater}
          getTheaters={getTheaters}
          setSelectedTheater={setSelectedTheater}
          formType={formType}
        />
      )}
      {isDeleteModalOpen && <DeleteTheatreModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} selectedTheatre={selectedTheater} setSelectedTheatre={setSelectedTheater} getTheaters={getTheaters} />}
    </>
  );
}
