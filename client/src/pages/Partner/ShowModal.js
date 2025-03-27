import { Modal, Button, Table, Form, Col, Input, Row, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import {addShow, getAllShowsByTheater, updateShow, deleteShow} from '../../apis/shows';
import {getMovies} from '../../apis/movies';
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

export default function ShowModal({
  isShowModalOpen,
  setIsShowModalOpen,
  selectedTheater,
  setSelectedTheater,
}) {
  const [view, setView] = useState("table");
  const [shows, setShows] = useState();
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsShowModalOpen(false);
    setSelectedTheater(null);
  };
  const handleDelete = async (id) => {
    try {
        const response = await deleteShow({showId: id});
        if(response.success) {
            getData();
            message.success(response.message);
        }else {
            message.error(response.message);
            console.log(response.message);
        }
    }catch(err) {   
        message.error(err.message);
    }
  }
  const getData = async () => {

    try {
        const movies = await getMovies();
        if(movies.success) {
            setMovies(movies.data);
        }else {
            message.error(movies.message);
        }
        const response = await getAllShowsByTheater({_id: selectedTheater._id });
        if(response.success) {
            const shows = response.data;
            setShows(shows.map((show) => ({...show, key: `show${show._id}`})));
        }else {
            message.error(response.message);
            console.log(response.message);
        }
    }catch(err) {
        message.error(err.message);
    }
  }
  const onFinish = async (values) => {
    try {
        dispatch(showLoading());
        let response = null;
        if(view === 'form') {
            response = await addShow({...values, theatre: selectedTheater._id}); 
            console.log(response);
        }else {
            response = await updateShow({...values, showId: selectedShow._id, theatre: selectedTheater._id});
        }
        if(response.success) {
            getData();
            message.success(response.message);
            setView('table');
        }else {
            message.error(response.message);
            console.log(response.message);
        }
        dispatch(hideLoading())
    }catch(err) {   
        setIsShowModalOpen(false);
        dispatch(hideLoading());
    }
  } 

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Show Date",
      dataIndex: "date",
      render: (text, data) => {
        return moment(text).format("MMM Do YYYY");
      },
    },
    {
      title: "Show Time",
      dataIndex: "time",
      render: (text, data) => {
        return moment(text, "HH:mm").format("hh:mm A");
      },
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, data) => {
        return data.movie.name;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "seats",
      render: (text, data) => {
        return data.totalSeats - data.bookedSeats.length;
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
                  setView("edit");
                  setSelectedMovie(data.movie);
                  setSelectedShow({
                    ...data,
                    date: moment(data.date).format("YYYY-MM-DD"),
                  });
                  console.log(selectedMovie && selectedMovie.title);
                }}
              >
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(data._id)}>
                <DeleteOutlined />
              </Button>
              {data.isActive && (
                <Button
                  onClick={() => {
                    setIsShowModalOpen(true);
                  }}
                >
                  + Shows
                </Button>
              )}
            </div>
          );
        },
      },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      centered
      title={selectedTheater.name}
      open={isShowModalOpen}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      <div className="d-flex justify-content-between">
        <h3>
          {view === "table"
            ? "List of Shows"
            : view === "form"
            ? "Add Show"
            : "Edit Show"}
        </h3>
        {view === "table" && (
          <Button type="primary" onClick={() => setView("form")}>
            Add Show
          </Button>
        )}
      </div>
      {view === "table" && <Table dataSource={shows} columns={columns} />}
      {(view === "form" || view === "edit") && (
        <Form
          className=""
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={view === "edit" ? selectedShow : null}
          onFinish={onFinish}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Show Name"
                    htmlFor="name"
                    name="name"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show name is required!" },
                    ]}
                  >
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter the show name"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Date"
                    htmlFor="date"
                    name="date"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show date is required!" },
                    ]}
                  >
                    <Input
                      id="date"
                      type="date"
                      placeholder="Enter the show date"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Timing"
                    htmlFor="time"
                    name="time"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show time is required!" },
                    ]}
                  >
                    <Input
                      id="time"
                      type="time"
                      placeholder="Enter the show date"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
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
                <Col span={8}>
                  <Form.Item
                    label="Select the Movie"
                    htmlFor="movie"
                    name="movie"
                    className="d-block"
                    rules={[{ required: true, message: "Movie  is required!" }]}
                  >
                    <Select
                      id="movie"
                      placeholder="Select Movie"
                      defaultValue={selectedMovie && selectedMovie.movieName}
                      style={{ width: "100%", height: "45px" }}
                      options={movies.map((movie) => ({
                        key: movie._id,
                        value: movie._id,
                        label: movie.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Ticket Price"
                    htmlFor="ticketPrice"
                    name="ticketPrice"
                    className="d-block"
                    rules={[
                      { required: true, message: "Ticket price is required!" },
                    ]}
                  >
                    <Input
                      id="ticketPrice"
                      type="number"
                      placeholder="Enter the ticket price"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Total Seats"
                    htmlFor="totalSeats"
                    name="totalSeats"
                    className="d-block"
                    rules={[
                      { required: true, message: "Total seats are required!" },
                    ]}
                  >
                    <Input
                      id="totalSeats"
                      type="number"
                      placeholder="Enter the number of total seats"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex gap-10">
            <Button
              className=""
              block
              onClick={() => {
                setView("table");
              }}
              htmlType="button"
            >
              <ArrowLeftOutlined /> Go Back
            </Button>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              {view === "form" ? "Add the Show" : "Edit the Show"}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}
