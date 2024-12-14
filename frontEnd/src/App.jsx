import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './LoginPages/Login';
import Home from './HomePages/Home';
import "./App.css"
import SignUp from './LoginPages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from './HomePages/CreateBlog';
import Profile from './HomePages/Profile';

function App() {
    
     return (
            <Router>
            <Routes>    
                <Route path="/" element={<Navigate to="/home" replace/>} />
                <Route path='/home' element={<Home/>}/>
                <Route path='/auth/signup' element={<SignUp/>}/>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/createBlog" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
