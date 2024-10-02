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
import SubscriptionUpdate from './pages/SubscriptionUpdate';
import AddGoal from './pages/AddGoal';
import AddGoalPayment from './pages/AddGoalPayment';
import GoalUpdatePage from './pages/UpdateGoal';
import Dashboard from './pages/dashboard';
import ContactForm from './pages/contact';
import GoalDetails from './pages/GoalDetails';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="w-5/6 mx-auto App">
        <ToastContainer />
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/register" element={<AccountRegisterPage></AccountRegisterPage>}></Route>
          <Route path="/Subscription-details" element={<SusbcriptionDetails />}></Route>
          <Route
            path="/register"
            element={<AccountRegisterPage></AccountRegisterPage>}
          ></Route>
          <Route
            path="/Subscription-details"
            element={<SusbcriptionDetails />}
          ></Route>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route
            path="/addIncome"
            element={<IncomeAddPage></IncomeAddPage>}
          ></Route>
          <Route path="/updateIncome" element={<IncomeupdatePage />}></Route>
          <Route path="/Income-details" element={<CheckoutPage />} />
          <Route path="/addExpense" element={<ExpensePage />} />
          <Route path="/updateExpense" element={<ExpenseUpdate />}></Route>
          <Route path="/Expense-details" element={<CheckoutExpensePage />} />
          <Route
            path="/updateSubscription"
            element={<SubscriptionUpdate />}
          ></Route>
          <Route path="/addGoal" element={<AddGoal />}></Route>
          <Route path="/contact-us" element={<ContactForm />} />

          <Route path="/addGoalPayment" element={<AddGoalPayment />}></Route>
          <Route path="/updateGoal" element={<GoalUpdatePage />}></Route>
          <Route path="/Goal-details" element={<GoalDetails />}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
