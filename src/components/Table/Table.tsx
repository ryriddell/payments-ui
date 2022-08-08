import { ChangeEvent, Fragment, useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Payment } from "./Table.types";
import { getAllCountries, getAllPayments, getAllPaymentsForCountry } from "../data/restFns";
import './Table.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PaymentsStoreType, replaceCountries } from "../../store/store";

const Table = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [countries, setCountries] = useState<string[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchCountry = searchParams.get('country');
    const [selectedCountry, setSelectedCountry] = useState<string>(searchCountry || '');

    const countriesFromRedux: string[] = useSelector<PaymentsStoreType, string[]>(reduxStore => reduxStore.countries);


    useEffect(() => {
        const paymentsPromise = getAllPayments();
        paymentsPromise.then((result) => {
            setPayments(result.data);
            setLoading(false);
        });

        if (countriesFromRedux.length > 0) {
            console.log('using redux countries');
            setCountries(countriesFromRedux);
        } else {
            const countriesPromise = getAllCountries();
            countriesPromise.then((result) => {
                const countryData = result.data;
                setCountries(countryData.sort());
                dispatch(replaceCountries(countryData));
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        if (searchCountry) loadDataForCountry(searchCountry)
    }, [])
;
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
        const index = event.currentTarget.selectedIndex;
        const country = countries[index-1];
        setSelectedCountry(country);
        setSearchParams({ country });
        
        loadDataForCountry(country);
    }

    const loadDataForCountry = (country: string) => {
        const paymentsPromise = getAllPaymentsForCountry(country);
        paymentsPromise.then((result) => {
            setPayments(result.data);
            setLoading(false);
        });
    };

    return (
        <Fragment>
            <select onChange={changeCountry}>
                <option value={selectedCountry}>--- select</option>
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