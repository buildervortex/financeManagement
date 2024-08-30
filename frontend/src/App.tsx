import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountRegister from './pages/AccountRegister';

function App() {
  const navItems = [
    { name: "Customers", to: "/" },
    { name: "Create", to: "/customers" }
  ]
  return (
    <Router>
      <div className="App mx-auto w-5/6">
        {/* <NavBar navItems={navItems}></NavBar> */}
        <Routes>
          <Route path="/" element={<AccountRegister></AccountRegister>}></Route>
          {/* <Route path='/customers' element={<CustomerForm></CustomerForm>}></Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
