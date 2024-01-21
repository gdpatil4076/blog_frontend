// components/BlogList.js
import React, { useState } from "react";
import SearchBar from "./SearchBar";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="container mt-4">

      <SearchBar onSearchResults={handleSearchResults} />

      <div className="container mt-4">
        <div className="row">
          {searchResults &&
            searchResults.map((blog) => (
              <div key={blog._id} className="col-md-4 col-sm-6 mb-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={blog.profileImageUrl}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.blog}</p>
                    <p></p>
                    {blog.likedBy.length > 0 && (
                      <p>
                        Last liked by {blog.likedBy[blog.likedBy.length - 1]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default SearchResults;
