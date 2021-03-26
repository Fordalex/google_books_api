import React from 'react'
import axios from 'axios';
import {apiKey} from '../config/default.json'

const Form = ({setBookSearch, setApiData}) => {

    const searchBookHandler = async (e) => {
        e.preventDefault();
        const search = document.getElementById('searchInput').value;
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`
          );
          console.log(res.data)
          setApiData({ book: res.data });
        setBookSearch(search);
    }

    return (
        <form onSubmit={searchBookHandler} id="bookForm">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/search.png"/>
            <input type="text" id="searchInput" placeholder="Search..."/>
            <button>Search</button>
        </form>
    )
}

export default Form;