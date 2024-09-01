import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccountRegisterPage from './pages/AccountRegister';
import LoginPage from './pages/login';



function App() {
  return (
    <Router>
      <div className="App mx-auto w-5/6">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
        </Routes>
        <Routes>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
        </Routes>
        
      </div>
    </Router>
  );
}



export default App;
