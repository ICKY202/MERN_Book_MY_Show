import { useNavigate, Link, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../apis/user";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import {
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const navItems = [
    {
      key: "home",
      label: (
        <Link to="/">
          Home
        </Link>
      ),
      icon: <HomeOutlined />,
    },

    {
      key: "user",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <Link to={`/${user?._id}`}>
              My Profile
            </Link>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <span
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </span>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(showLoading());
        const resp = await getUser();
        console.log(resp);
        if (!resp.success) {
          navigate("/login");
        }
        dispatch(setUser(resp.data));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(hideLoading());
      }
    };
    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, []);
  

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>Book My Show</h3>
            </Link>
            <Menu theme="dark" mode="horizontal" items={navItems} selectedKeys={["/", `/${user?._id}`]} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            <Outlet />
          </div>
        </Layout>
      </>
    )
  );
}
