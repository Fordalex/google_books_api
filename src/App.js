import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import Books from './components/Books';
import Form from './components/Form';

function App() {

  const [bookSearch, setBookSearch] = useState('Steven');
  const [apiData, setApiData] = useState({ loading: true });

  return (
    <Fragment>
      <Form setBookSearch={setBookSearch} setApiData={setApiData}/>
      <Books bookSearch={bookSearch} setApiData={setApiData} apiData={apiData}/>
    </Fragment>

  );
}

export default App;
