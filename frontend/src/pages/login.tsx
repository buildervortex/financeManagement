import { FunctionComponent, useState } from 'react';
import LoginDto from '../dtos/account/loginDto';
import AccountViewModel from '../viewModels/AccountViewModel';
import InputForm from '../components/inputForm';
import ErrorMessage from '../viewModels/error';
import { handleErrorResult } from '../utils/errorMessage';
import { useNavigate } from 'react-router-dom';

interface AccountLoginPageProps {
}

const LoginPage: FunctionComponent<AccountLoginPageProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginDto: LoginDto = new LoginDto();
        loginDto.email = email;
        loginDto.password = password;
        const result = await new AccountViewModel().loginAccount(loginDto);
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        }else{
            navigate('/dashboard')
        } 
        
    }

    let inputElements = [
        {
            labelContent: 'Email',
            onChange: (e: any) => setEmail(e.target.value),
            type: "email",
            name: "email",
            id: "email",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "name@company.com"
        },
        {
            labelContent: 'Password',
            onChange: (e: any) => setPassword(e.target.value),
            type: "password",
            name: "password",
            id: "password",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "••••••••"
        }
    ]

    return (
        <InputForm formName='Login' submitButton='Login' inputs={inputElements} onSubmit={handleSubmit}></InputForm>
    );
}

export default LoginPage;