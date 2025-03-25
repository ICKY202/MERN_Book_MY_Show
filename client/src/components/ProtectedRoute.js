import {useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getUser} from '../apis/user';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { setUser } from '../redux/userSlice';
import {HomeOutlined, ProfileOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import { Layout,Menu } from 'antd';
import { Header } from "antd/es/layout/layout";

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const navItems = [
        {
          label: "Home",
          icon: <HomeOutlined />,
        },
    
        {
          label: `${user ? user.name : ""}`,
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <span
                onClick={() => {
                  if(user.isAdmin) {
                    navigate('/admin');
                  }
                }}
                >
                  My Profile
                </span>
              ),
              icon: <ProfileOutlined />,
            },
    
            {
              label: (
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Log Out
                </Link>
              ),
              icon: <LogoutOutlined />,
            },
          ],
        },
    ]
    
    useEffect(() => {
        console.log("hello")
        const fetchUser = async () => {
        try {
            dispatch(showLoading());
            const resp = await getUser();
            console.log(resp);
            if(!resp.success) {
              navigate('/login');
            }
            dispatch(setUser(resp.data));
        }catch(err) {
            console.log(err);
        }finally {
            dispatch(hideLoading())
        }

    }
    if(localStorage.getItem('token')) {
        
        console.log("gookul");
        fetchUser();
    }else {
        navigate('/login');
    }
  }, []);

    return (
        user && (<>
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
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
        </>)
    );
}