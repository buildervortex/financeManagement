import * as React from 'react';
import CustomerService from '../services/customerService';
import { useNavigate, NavigateFunction } from 'react-router';


interface CustomerFormProps {

}

const CustomerForm: React.FunctionComponent<CustomerFormProps> = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = React.useState({
        name: '',
        age: 0,
        phone: '',
        email: ''
    });
    return (
        <form className="max-w-sm mx-auto" method='post' onSubmit={(e) => { handleSubmit(e, customer, navigate) }}>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="text" id="name" name='name' onChange={(target) => { handleChange(target, customer, setCustomer) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required />
            </div>
            <div className="mb-5">
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
                <input type="number" id="age" name='age' onChange={(target) => { handleChange(target, customer, setCustomer) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age" required />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                <input type="tel" id="phone" name='phone' onChange={(target) => { handleChange(target, customer, setCustomer) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                <input type="email" name='email' onChange={(target) => { handleChange(target, customer, setCustomer) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

function handleSubmit(e: React.FormEvent, customer: any, navigator: NavigateFunction) {
    e.preventDefault();

    let customerService = new CustomerService()
    customerService.saveCustomer(customer).then(() => {
        navigator("/");
    });


}

function handleChange({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>, customer: any, setCustomer: React.Dispatch<React.SetStateAction<any>>) {
    console.log(customer);
    // clone the data
    const data = { ...customer };

    data[input.name] = input.value;

    setCustomer(data);
}

export default CustomerForm;