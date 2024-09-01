import { FunctionComponent, useState } from 'react';
import RegisterDto from '../dtos/account/registerDto';
import AccountViewModel from '../viewModels/AccountViewModel';
import InputForm from '../components/inputForm';
import { handleLoginResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';

interface AccountRegisterPageProps {
}

const AccountRegisterPage: FunctionComponent<AccountRegisterPageProps> = () => {
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const registerDto: RegisterDto = new RegisterDto();
        registerDto.email = email;
        registerDto.fullName=fullName;
        registerDto.password = password;
        registerDto.userName = userName;
        const result = await new AccountViewModel().registerAccount(registerDto);
        if (result instanceof ErrorMessage) {
            handleLoginResult(result);
        } 
    }

    let inputElements = [
        {
            labelContent: 'Fullname',
            onChange: (e: any) => setFullName(e.target.value),
            type: "text",
            name: "fullName",
            id: "fullName",
            className: "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Full Name"
        },

        {
            labelContent: 'Username',
            onChange: (e: any) => setUserName(e.target.value),
            type: "text",
            name: "username",
            id: "username",
            className: "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "username"
        },

        {
            labelContent: 'Email',
            onChange: (e: any) => setEmail(e.target.value),
            type: "email",
            name: "email",
            id: "email",
            className: "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "name@company.com"
        },
        {
            labelContent: 'Password',
            onChange: (e: any) => setPassword(e.target.value),
            type: "password",
            name: "password",
            id: "password",
            className: "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "••••••••"
        },
    ]

    return (
        <InputForm formName='Register' submitButton='Create an account' inputs={inputElements} onSubmit={handleSubmit}></InputForm>
    );
}

export default AccountRegisterPage;