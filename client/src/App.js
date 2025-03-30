import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin/Admin';
import Partner from './pages/Partner/partner';
import SingleMovie from './components/SingleMovie';
import BookShow from './components/BookShow';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
            <Route path='/partner' element={<ProtectedRoute><Partner /></ProtectedRoute>}></Route>
            <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie /></ProtectedRoute>}/>
            <Route path="/book-show/:id" element={<ProtectedRoute><BookShow/></ProtectedRoute>}/>
            <Route path='/forget' element={<ForgotPassword />}/>
            <Route path='/reset' element={<ResetPassword />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
