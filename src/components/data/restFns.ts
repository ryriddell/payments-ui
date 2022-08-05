import axios, { AxiosPromise } from "axios";
import { Transaction } from "../table/Table.types";

export const getAllCountries =  async () => {
    const url = 'http://localhost:8080/api/country';
    const config = {
        headers: {
            "Accept": "application/json"
        }
    };
    const result = await axios.get(url, config);
    console.log(result.status);
    console.log(result.data);
    return result.data;
};