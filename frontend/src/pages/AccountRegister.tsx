import { FunctionComponent, useState } from 'react';
import RegisterDto from '../dtos/account/registerDto';
import AccountViewModel from '../viewModels/AccountViewModel';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import { useNavigate } from 'react-router-dom';

interface AccountRegisterPageProps {}

const AccountRegisterPage: FunctionComponent<AccountRegisterPageProps> = () => {
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const registerDto: RegisterDto = new RegisterDto();
        registerDto.email = email;
        registerDto.fullName = fullName;
        registerDto.password = password;
        registerDto.userName = userName;

        const result = await new AccountViewModel().registerAccount(registerDto);
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                            Create an account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountRegisterPage;
