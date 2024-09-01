import { FunctionComponent } from 'react';

interface InputFormProps {
    formName?: string;
    submitButton?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputs: InputWithLabelProps[];
}

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent?: string;
    labelClassNames?: string;
    labelFor?: string;
}

const InputForm: FunctionComponent<InputFormProps> = ({ formName, submitButton = "Submit", inputs, onSubmit }: InputFormProps) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">{formName}</h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                        {inputs.map((inputElement, index) => {
                            const { labelContent, labelClassNames, labelFor, ...rest } = inputElement;
                            return (
                                <div key={index}>
                                    {labelContent && <label htmlFor={labelFor} className={labelClassNames}>{labelContent}</label>}
                                    <input {...rest} />
                                </div>
                            );
                        })}
                        <button type="submit" className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{submitButton}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputForm;