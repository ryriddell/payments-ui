import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const {orderId} = useParams<string>();
    useEffect(() => {
        if (orderId) setSearchTerm(orderId);
    }, []);

    const doSearch = () => {
        navigate(`/find/${searchTerm}`);
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