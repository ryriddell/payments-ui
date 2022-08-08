import { ChangeEvent, Fragment, useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Transaction, Payment } from "./Table.types";
import { getAllCountries, getAllPayments, getAllPaymentsForCountry } from "../data/restFns";
import './Table.css';

const Table = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    useEffect(() => {
        const paymentsPromise = getAllPayments();
        paymentsPromise.then((result) => {
            setPayments(result.data);
            setLoading(false);
        });

        const countriesPromise = getAllCountries();
        countriesPromise.then((result) => {
            setCountries(result.data);
            setLoading(false);
        });
    }, []);

    const mapCountries = countries.map((country) => {
        return <option key={country} value={country}>{country}</option>
    })

    const mapPayments = payments.map(payment => 
        <TableRow 
            key={payment.id}
            id={payment.id}
            order={payment.orderId}
            date={payment.date}
            country={payment.country}
            currency={payment.currency}
            amount={payment.amount}
        />
    );

    const changeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);

        const index = event.currentTarget.selectedIndex;
        const country = countries[index-1];
        setSelectedCountry(country);
        
        const paymentsPromise = getAllPaymentsForCountry(country);
        paymentsPromise.then((result) => {
            setPayments(result.data);
                        
        });

        setLoading(false);
    }

    return (
        <Fragment>
            <select onChange={changeCountry}>
                <option value="">--- select</option>
                {mapCountries}
            </select>
            <table className='transactionsTable'><thead>
                <tr><th>Id</th><th>OrderId</th><th>Date</th><th>Country</th><th>Currency</th><th>Amount</th></tr>
                </thead>
                <tbody>
                    {mapPayments}
                </tbody>
            </table>
          
            {loading && <p>Please wait... loading</p>}
        </Fragment>
    );
};

export default Table;