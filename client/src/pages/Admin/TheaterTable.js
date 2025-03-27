import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import { getAllTheaters, updateTheater } from "../../apis/theater";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

export default function TheatersTable() {
  const [theaters, setTheaters] = useState([]);
  const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(showLoading);
            const resp = await getAllTheaters();
            if(resp.success) {
                const allTheaters = resp.data;
                setTheaters(allTheaters.map((item)=> ({...item, key: `theater${item._id}`})));
            }else {
                message.error(resp.message);
            }
            dispatch(hideLoading);
        }catch(err) {
            message.error(err.message);
            dispatch(hideLoading);
        }
    };
    const handleStatusChange = async (theater) => {
    try{
        dispatch(showLoading());
        let values = {...theater, theaterId: theater._id, isActive: !theater.isActive};
        const response = await updateTheater(values);
        console.log(response, theater);
        if(response.success) {
            message.success(response.message);
            getData();
        }
    }catch(err) {
        dispatch(hideLoading());
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
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
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
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return <Table dataSource={theaters} columns={columns} />;
}
