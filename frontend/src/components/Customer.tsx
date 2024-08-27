import { useEffect, useState } from 'react';
import CustomerModel from '../viewModel/CustomerViewModel';
import Table from './common/Table';
import CustomerService, { ICustomerService } from '../services/customerService';

const Customer = () => {
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const TableHeaders: string[] = ["Customer Name", "Customer Age", "Phone", "Email"]
    const customerService: ICustomerService = new CustomerService();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers: CustomerModel[] = await customerService.getCustomers();
                setCustomers(customers);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
    }, [])

    return (
        <div>
            <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl'>Customers</h1>
            <Table tableHeaders={TableHeaders} tableData={customers.map(customer => [customer.name, customer.age, customer.phone, customer.email])}></Table>
        </div>
    );
}

export default Customer;