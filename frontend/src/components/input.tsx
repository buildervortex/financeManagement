import React, { FunctionComponent } from 'react';

export interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent?: string
    labelClassNames?: string
    labelFor?: string
}

const InputWithLabel: FunctionComponent<InputWithLabelProps> = ({ labelClassNames = "block mb-2 text-sm font-medium text-gray-900 dark:text-white", labelContent, labelFor, className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", ...rest }: InputWithLabelProps) => {
    labelFor = labelFor || rest.id;
    return (
        <div>
            {labelContent && <label htmlFor={labelFor} className={labelClassNames}>{labelContent}</label>}
            <input className={className} {...rest} />
        </div>
    );
}

export default InputWithLabel;