import { useState } from 'react';
import './Search.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const doSearch = () => {
        console.log(searchTerm);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };
    
    return (
        <div className="searchBox">
            <label htmlFor="orderId">Order Id:</label>
            <input onChange={handleChange} id="orderId" type='text'/>
            <button onClick={doSearch}>Search</button>
        </div>
    );
};

export default Search;