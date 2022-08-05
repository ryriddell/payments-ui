import TableRow from "./TableRow";
import { Transaction } from "./Table.types";
import { getAllCountries } from "../data/restFns";
import './Table.css';

const Table = () => {
    // const transactionData: Transaction[] = [
    //     {id: 101, date: '2017-01-31', country: 'USA', currency: 'USD', amount: 160},
    //     {id: 102, date: '2017-02-01', country: 'FRA', currency: 'EUR', amount: 200},
    //     {id: 103, date: '2017-02-01', country: 'SWE', currency: 'EUR', amount: -100},
    //     {id: 104, date: '2017-02-02', country: 'USD', currency: 'USA', amount: 60},
    //     {id: 105, date: '2017-01-31', country: 'USA', currency: 'USD', amount: 160}
    // ]

    const tableData = getAllCountries().then((transactions: Transaction[]) => {
        return transactions.map(transaction => <TableRow 
            id={transaction.id}
            date={transaction.date}
            country={transaction.country}
            currency={transaction.currency}
            amount={transaction.amount}
            />
        );
    });

    // const tableData = transactionData.map(transaction => <TableRow 
    //     id={transaction.id}
    //     date={transaction.date}
    //     country={transaction.country}
    //     currency={transaction.currency}
    //     amount={transaction.amount}
    //     />
    // );

    return (
        <div>  
            <table className='transactionsTable'><thead>
                <tr><th>Id</th><th>Date</th><th>Country</th><th>Currency</th><th>Amount</th></tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    );
};

export default Table;