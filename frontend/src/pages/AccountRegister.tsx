import { FunctionComponent, useState } from 'react';
import RegisterDto from '../dtos/account/registerDto';
import AccountViewModel from '../viewModels/AccountViewModel';
import InputForm from '../features/inputForm';

interface AccountRegisterPageProps {
}

const AccountRegisterPage: FunctionComponent<AccountRegisterPageProps> = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const registerDto: RegisterDto = new RegisterDto();
        registerDto.email = email;
        registerDto.password = password;
        registerDto.userName = userName;
        await new AccountViewModel().registerAccount(registerDto);
    }

    let inputElements = [
        {
            labelContent: 'Email',
            onChange: (e: any) => setEmail(e.target.value),
            type: "email",
            name: "email",
            id: "email",
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "name@company.com"
        },
        {
            labelContent: 'Username',
            onChange: (e: any) => setUserName(e.target.value),
            type: "text",
            name: "username",
            id: "username",
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "username"
        },
        {
            labelContent: 'Password',
            onChange: (e: any) => setPassword(e.target.value),
            type: "password",
            name: "password",
            id: "password",
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "••••••••"
        }
    ]

    return (
        <InputForm formName='Register' submitButton='Create an account' inputs={inputElements} onSubmit={handleSubmit}></InputForm>
    );
}

export default AccountRegisterPage;