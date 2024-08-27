import './App.css';
import Customer from './components/Customer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CustomerForm from './components/CustomerForm';

function App() {
  const navItems = [
    { name: "Customers", to: "/" },
    { name: "Create", to: "/customers" }
  ]
  return (
    <Router>
      <div className="App mx-auto w-5/6">
        <NavBar navItems={navItems}></NavBar>
        <Routes>
          <Route path="/" element={<Customer></Customer>}></Route>
          <Route path='/customers' element={<CustomerForm></CustomerForm>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
