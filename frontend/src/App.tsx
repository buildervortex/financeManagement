import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccountRegisterPage from './pages/AccountRegister';
import LoginPage from './pages/login';
import NavBar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <div className="App mx-auto w-5/6">
      <NavBar />
      <ToastContainer />
        <Routes>
          <Route path="/" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
        </Routes>
        <Routes>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
        </Routes>
        <Footer/>
        
      </div>
    </Router>
  );
}



export default App;
