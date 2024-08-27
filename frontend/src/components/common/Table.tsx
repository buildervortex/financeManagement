import * as React from 'react';
import { Component } from 'react';

interface TableProps {
    tableHeaders: string[]
    tableData: Array<Array<any>>
}

const Table: React.FunctionComponent<TableProps> = (props: TableProps) => {
    let { tableData, tableHeaders } = props;
    return (
        <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {tableHeaders.map(header => <th scope='col' className="px-6 py-3" key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody className="">
                    {tableData.map(data => <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>{data.map(column => <td className="px-6 py-4">{column}</td>)}</tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Table;