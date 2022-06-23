import React, { useState } from 'react';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="search-box">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Search product..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" id="search_btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
