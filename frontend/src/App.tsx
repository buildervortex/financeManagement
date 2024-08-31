import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountRegisterPage from './pages/AccountRegister';


function App() {
  return (
    <Router>
      <div className="App mx-auto w-5/6">
        <Routes>
          <Route path="/" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
        </Routes>
      </div>
    </Router>
  );
}



export default App;
