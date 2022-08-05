import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Search from './components/search/Search';
import Table from './components/table/Table';

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <Table/>
    </div>
  );
}

export default App;
