import { FunctionComponent, ReactNode } from 'react';

interface InputFormProps {
    formName?: string;
    submitButton?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputs: InputWithLabelProps[];
    children?: ReactNode;
}

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent?: string;
    labelClassNames?: string;
    labelFor?: string;
}

const InputForm: FunctionComponent<InputFormProps> = ({ formName, submitButton = "Submit", inputs, onSubmit, children }: InputFormProps) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">{formName}</h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                        {inputs.map((inputElement, index) => {
                            const { labelContent, labelClassNames, labelFor, ...rest } = inputElement;
                            return (
                                <div>
                                    <div key={index}>
                                        {labelContent && <label htmlFor={labelFor} className={labelClassNames} >{labelContent}</label>}
                                        <input {...rest} />
                                    </div>
                                    {children}
                                </div>
                            );
                        })}

                        <button type="submit" className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center ">{submitButton}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputForm;