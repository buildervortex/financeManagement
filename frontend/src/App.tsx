import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccountRegisterPage from './pages/AccountRegister';
import LoginPage from './pages/login';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import IncomePage from './pages/Income';



function App() {
  return (
    <Router>
      <NavBar />
      <div className="App mx-auto w-5/6">
      
      <ToastContainer />
        <Routes>
          <Route path="/" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
        </Routes>
        <Routes>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
        </Routes>  

        <Routes>
        <Route path="/Income" element={<IncomePage></IncomePage>}></Route>
          </Routes>      
      </div>
      <Footer/>
    </Router>
  );
}



export default App;
