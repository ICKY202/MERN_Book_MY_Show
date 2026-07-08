import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin/Admin';
import Partner from './pages/Partner/partner';
import User from './pages/User/User';
import SingleMovie from './components/SingleMovie';
import BookShow from './components/BookShow';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />

            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home/>}/>
              <Route path='/:id' element={<Profile />}>
                <Route path="admin" element={<Admin />}></Route>
                <Route path="partner" element={<Partner />}></Route>
                <Route path="user" element={<User />}></Route>
                <Route path='orders'></Route>
                <Route path='rewards'></Route>
                <Route path="wishlist"></Route>
              </Route>
              {/* <Route path='/admin' element={<Admin />}></Route> */}
              {/* <Route path='/partner' element={<Partner />}></Route> */}
              <Route path="/movie/:id" element={<SingleMovie />}/>
              <Route path="/book-show/:id" element={<BookShow/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
