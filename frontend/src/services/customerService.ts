import api from "./api";
import CustomerModel from "../viewModel/CustomerViewModel";


export interface ICustomerService {
    getCustomers: () => Promise<CustomerModel[]>;
    getCustomerById: (id: number) => Promise<CustomerModel>;
}

class CustomerService implements ICustomerService {
    async getCustomers() {
        const response = await api.get<CustomerModel[]>("/customers");
        return response.data;
    };
    async getCustomerById(id: number) {
        const response = await api.get<CustomerModel>(`/customers/${id}`)
        return response.data;
    };

    async saveCustomer(customer: CustomerModel) {
        const response = await api.post(`/customers`, customer);
        return response.data;
    }
}



export default CustomerService;