import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import Books from "./components/Books";
import Form from "./components/Form";
import BookInfo from './components/BookInfo';

function App() {
  const [bookSearch, setBookSearch] = useState("Steven");
  const [apiData, setApiData] = useState({
    loading: true,
    msg: "Please search a book title.",
  });
  const [bookIndex, setBookIndex] = useState(0)

  return (
    <Fragment>
      <div class='search-book-container'>
        <Form setBookSearch={setBookSearch} setApiData={setApiData} />
        <Books
          bookSearch={bookSearch}
          setApiData={setApiData}
          apiData={apiData}
          setBookIndex={setBookIndex}
        />
      </div>
      <div class="one-book-info-container">
        <BookInfo bookIndex={bookIndex} apiData={apiData}/>
      </div>
    </Fragment>
  );
}

export default App;
