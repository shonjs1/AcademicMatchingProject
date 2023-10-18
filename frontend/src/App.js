import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages';
import About from './pages/about';
import Services from './pages/services';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './pages/contact';
import Footer from './components/footer';
import User from './pages/user';
import Login from './pages/loginForm';
import Calendar from './pages/calendar';
import React ,{useState} from 'react';
import Register from './pages/registerForm2';
import Profile from './pages/profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [seen, setSeen] = useState(false)
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);

  const openLogin = () => {
    setLoginVisible(true);
  };

  const closeLogin = () => {
    setLoginVisible(false);
  };

  
  
  const openRegister = () => {
    setRegisterVisible(true);
  };

  const closeRegister = () => {
    setRegisterVisible(false);
  };


  return (
    <div className="App">
      <Navbar openLogin={openLogin} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />

      {isLoginVisible && <Login onClose={closeLogin} registerVisible = {openRegister} />}

      {isRegisterVisible && <Register onClose={closeRegister} />}

      
    </div>
  );
}

export default App;