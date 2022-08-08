import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Search from './components/search/Search';
import Table from './components/table/Table';
import Transactions from './components/transactions/Transactions';
import Home from './components/Home';
import './App.css';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/find" element={
              <Fragment>
                <Search />
                <Table />
              </Fragment>
            } />

            <Route path="/find/:orderId" element={
              <Fragment>
                <Search />
                <Table />
              </Fragment>
            } />

            <Route path="/new" element={
              <>
                <Transactions />
              </>
            } />

            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>Sorry that page doesn't exist</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;


//             <Route path="/find/:orderId" element={
//               <Fragment>
//                 <Search />
//                 <TransactionsTable />
//               </Fragment>
//             } />

//             <Route path="/new" element = {<NewTransaction />} />
            
//             <Route path="/" element= {<HomePage />} />
//             <Route path="*" element={<h1>Sorry that page doesn't exist </h1>} />
