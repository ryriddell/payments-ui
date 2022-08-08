import axios, { AxiosPromise } from "axios";

export const getAllPayments = () => {
    const url = 'http://localhost:8080/api/payment';
    const config = {
        headers: {
            "Accept": "application/json"
        }
    };
    const result = axios.get(url, config);
    return result;
};

export const getAllCountries = () => {
    const url = 'http://localhost:8080/api/country';
    const config = {
        headers: {
            "Accept": "application/json"
        }
    };
    const result: AxiosPromise<string[]> = axios.get(url, config);
    return result;
};

export const getAllPaymentsForCountry = (country: string) => {
    const url = `http://localhost:8080/api/payment?country=${country}`;
    const config = {
        headers: {
            "Accept": "application/json"
        }
    };
    const result = axios.get(url, config);
    return result;
};