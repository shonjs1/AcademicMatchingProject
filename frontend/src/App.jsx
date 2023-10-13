import {BrowserRouter as Router, Routes, Route} from 
'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App
