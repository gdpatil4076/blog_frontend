// components/SearchBar.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import BlogContext from '../context/blogProvider';
import {url} from './const';

const SearchBar = ({ onSearchResults }) => {

  const {blogs} = useContext(BlogContext);

  const [query, setQuery] = useState('');


//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`blog/search?q=${query}`);
//     //   console.log(response.data.msg);
//       onSearchResults(response.data.msg);

//     } catch (error) {
//       console.error(error);
//     }
//   };

  const performSearch = () => {

    const results = blogs.filter(blog => {

      // Assuming you want to search in the blog title

      return blog.title.toLowerCase().includes(query.toLowerCase());

    });

    // Do something with the filtered results
    onSearchResults(results);

    console.log(results);

  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={performSearch}>Search</button>
    </div> 
  );
};

export default SearchBar; 


