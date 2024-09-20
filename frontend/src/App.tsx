import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccountRegisterPage from './pages/AccountRegister';
import LoginPage from './pages/login';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import IncomeAddPage from './pages/IncomeAdd';
import CheckoutPage from './pages/IncomeDetail';
import CheckoutExpensePage from './pages/ExpenseDetail'
import IncomeupdatePage from './pages/IncomeUpdate';
import Contact from './pages/contact';
import ExpensePage from './pages/Expence';
import ExpenseUpdate from './pages/ExpenseUpdate';
import SusbcriptionDetails from './pages/subscriptionDetails';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App mx-auto w-5/6">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
          <Route path="/Subscription-details" element={<SusbcriptionDetails />}></Route>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/addIncome" element={<IncomeAddPage></IncomeAddPage>}></Route>
          <Route path="/updateIncome" element={<IncomeupdatePage />}></Route>
          <Route path="/Income-details" element={<CheckoutPage />} />
          <Route path="/addExpense" element={<ExpensePage />} />
          <Route path="/updateExpense" element={<ExpenseUpdate />}></Route>
          <Route path="/Expense-details" element={<CheckoutExpensePage />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}



export default App;
