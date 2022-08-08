
import {render, screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import Transactions from "./Transactions";
import Table from "./Transactions";

jest.mock('../data/restFns', () => {
    return {
        getAllCountries: () => {
            console.log('mocked "getAllCountries"')
            return Promise.resolve({
                status: 200,
                data: ['a','b','c']
            })
        }
    }
});

test('The word "OrderId" appears on screen', () => {
    render(<BrowserRouter><Table/></BrowserRouter>);
    const tableEntry = screen.queryByText('Order Id');

    expect(tableEntry).toBeInTheDocument();
});

xtest('Countries are loaded when component is rendered', async () => {
    render(<BrowserRouter><Table/></BrowserRouter>);
    jest.setTimeout(2000);
    const options = await screen.findAllByRole('option');

    expect(options).toHaveLength(4);
});